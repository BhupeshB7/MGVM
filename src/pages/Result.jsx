import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import sign from "../Assets/MGVM.jpg";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Header from "../components/Header";
const Result = () => {
  const [show, setShow] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [className, setClassName] = useState("");
  const [loading,setLoading] =useState(false);
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const handleRecaptchaChange = (value) => {
    // console.log("Captcha value:", value);
    setCaptchaResponse(value);
    setIsVerified(true); // Set verified state to true for simplicity
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = `${now.getDate().toString().padStart(2, "0")}/${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${now.getFullYear()}`;
      let hours = now.getHours();
      const meridiem = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format
      const time = `${hours.toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${meridiem}`;
      setCurrentDateTime(`${date} ${time}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const handleCheckResult = async (e) => {
    e.preventDefault();
    // Call your backend API to verify the reCAPTCHA and check result
    console.log(rollNo,
    className,
    // captchaResponse,
    );
    try {
      setLoading(true);
      const response = await axios.post("https://mgvmserver.onrender.com/api/students/result", {
        rollNo,className
      });

      console.log(response.data);
      handleShow();
      // Proceed with displaying result or show error message based on the response from the server
      if (response.data.success) {
        setResult(response.data.result);
        setError("");
      } else {
        setResult("");
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error checking result:", error.response.data.error);
      setError(error.response.data.error);
      // Handle error
    }finally{
      setLoading(false);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const totalNumber = result.annualExam + result.test;
  let percentage = ((totalNumber * 100) / 690).toFixed(2);
  let division;

  if (percentage >= 60) {
    division = "First";
  } else if (percentage >= 45 && percentage < 60) {
    division = "Second";
  } else if (percentage >= 30 && percentage < 45) {
    division = "Third";
  } else {
    division = "Fail";
  }
  let grade;
 if(percentage>=85){
  grade="A+"
 }else if(percentage >=75 && percentage<85){
grade="A"
 }else if(percentage>=60 && percentage<75){
  grade="B"
 }else if(percentage>=50 && percentage<60){
  grade="C"
 }
 else if(percentage>=40 && percentage<50){
grade="D"
 }else{
  grade="E"
 }

  return (
    <div>
      <Background />
    <Header/>
      <Container>
        <div className="result_box mt-5">
          <div className="box border-[1.2px]  rounded-md border-green-200 h-[400px]">
            <p className="text-center mt-2 text-2xl text-green-700">Result</p>
            <div>
              <form onSubmit={handleCheckResult} className="form">
                <div className="form_input">
                  <label>Roll No:</label>
                  <input
                    type="number"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    required
                    placeholder="Enter RollNo"
                    className="border border-green-500 rounded-md p-3"
                  />
                </div>
                <div className="form_input">
                  <label>Class:</label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="border border-green-500 rounded-md p-2 bg-green-100"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </div>
                <div className="form_input">
                  <ReCAPTCHA
                    sitekey="6LdxqJ0pAAAAAPDd-7cTDkPo01brJJpc1ezDcVF4" // Replace with your actual site key
                    onChange={handleRecaptchaChange}
                  />
                </div>
                <div className="flex items-center justify-center p-2">
                  <button
                    onSubmit={handleCheckResult}
                    className="button-83 text-xl"
                    role="button"
                  >
                   {!loading? 'Check Result':'Checking...'}
                  </button>
                </div>
                {/* {result && <p>Result: {result}</p>} */}
                {error && <p className="text-center" style={{ color: "red" }}>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{result.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result.length ===0?(<>Results Not Found</>):(<>
          
          <div
            className="result_box  p-2 border border-green-500 rounded"
            id="modalContent"
          >
            <div className="schoolName block border border-green-500">
              <p className="pt-2">Residential Maa Gayatri Vidya Mandir</p>
              <p>Sahorbaghat, K.asthan Darbhanga</p>
            </div>
            <div className="resultName border border-green-500 m-1">
              <p className="pt-2" style={{ paddingLeft: "10px" }}>
                Name: &nbsp;&nbsp;&nbsp;&nbsp; {result.name}
              </p>
            </div>
            <div className="resultClass border border-green-500">
              <p className="border border-green=500 classRoll">
                Class: &nbsp;&nbsp;&nbsp;&nbsp; {result.className}
              </p>
              <p className="border border-green=500 classRoll">
                Roll No &nbsp;&nbsp;&nbsp;&nbsp; {result.rollNo}
              </p>
            </div>
            <Table striped bordered hover variant="light">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Annual Exam</th>
                  <th>Test</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
               
                <tr className="text-center">
                  <td>1</td>
                  <td>560</td>
                  <td>130</td>
                  <td>690</td>
                </tr>
                <tr className="text-center">
                  <td>2</td>
                  <td>{result.annualExam}</td>
                  <td>{result.test}</td>
                  <td>{totalNumber}</td>
                </tr>
              </tbody>
            </Table>
            <div className="resultClass border border-green-500">
              <p className="border border-green=500 classRoll">
                {percentage} % &nbsp;&nbsp;&nbsp;&nbsp; {division}
              </p>
              <p className="border border-green=500 classRoll">
                Grade: &nbsp;&nbsp;&nbsp;&nbsp; {grade}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-5 p-2">
              <p className="pt-3">{currentDateTime}</p>
              <img src={sign} alt="sign" height={60} width={100} />
            </div>
          </div>
          </>)}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            className="button-83 text-xl"
            role="button"
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Result;
