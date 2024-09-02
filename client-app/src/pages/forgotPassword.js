import React, { useState } from "react";
import { useMessage } from "../context/messagecontext";

const ForgotPassword = () => {
  const [tab, setTab] = useState(false);
  const [email, setEmail] = useState();
  const [answer, setAnswer] = useState("");

  const { setMessage } = useMessage();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setMessage("Please enter the email!");
      }

      const response = await axios.post(
        "http://localhost:4000/api/auth/forgot-password",
        { email }
      );
      if (response.status === 200) {
        setMessage(response.data.message);
        setTab(true);
      }
    } catch (error) {}
  };
  const handleAnswer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/security-question-answer",
        { answer }
      );
    } catch (error) {}
  };
  return (
    <>
      <div className="fcc">
        <div className="box-form fcc">
          <form
            className="fcc"
            onSubmit={tab ? handleAnswer : handleForgotPassword}
          >
            <div className="form-label">
              {message ? message : "Forgot password tab"}
            </div>
            <div className="mb-3">
              {tab ? (
                <input
                  type="string"
                  value={answer}
                  className="form-control"
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                />
              ) : (
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
