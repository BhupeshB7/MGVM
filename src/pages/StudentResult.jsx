import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Header from "../components/Header";
const LoadingSpinner = () => (
  <div className="spinner-container items-center justify-center flex mt-2">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);
const StudentResult = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://mgvmserver.onrender.com/api/students/students?page=${currentPage}`
        );
        setStudents(response.data.students);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await axios.delete(
          "https://mgvmserver.onrender.com/api/students/delete",
          { data: { id } }
        );
        alert(response.data.message);
        setStudents(students.filter((item) => item._id !== id));
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else if (error.request) {
          setError("No response received from the server");
          setTimeout(() => {
            setError("");
          }, 5000);
        } else {
          setError("An error occurred while processing the request");
        }
      }
    }
  };

  return (
    <div>
      <Background />
      <Header/>
      <Container>
        <button
          onClick={() => navigate("/admin/result/add")}
          className="button-83 text-xl m-2"
          role="button"
        >
          Add Result
        </button>
        <div className="allResults">
          <p className="text-2xl">All Students Results</p>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Roll No</th>
                    <th>Annual Result</th>
                    <th>Test</th>
                    <th>Total</th>
                    <th>Percentage</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => {
                    const total = item.annualExam + item.test;
                    const percentage = (total * 100) / 690;
                    return (
                      <tr className="text-center" key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.className}</td>
                        <td>{item.rollNo}</td>
                        <td>{item.annualExam}</td>
                        <td>{item.test}</td>
                        <td>{total}</td>
                        <td>{percentage.toFixed(2)}%</td>
                        <td onClick={() => handleDeleteItem(item._id)}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                            height={30}
                            width={25}
                            alt="delete_item"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </>
        )}
        <div className="flex flex-row justify-center">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="dark "
            className="m-1"
            style={{ width: "100px" }}
          >
            Prev
          </Button>
          <p className="text-2xl">
            {" "}
            {currentPage}/{totalPages}
          </p>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="dark "
            className="m-1"
            style={{ width: "100px" }}
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default StudentResult;
