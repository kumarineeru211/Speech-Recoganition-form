import React, { useState } from "react";
import "./Form.css";
import { BsFillMicFill } from "react-icons/bs";

function Form() {
  // State to store form data
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    State: "",
    District: "",
    Village: "",
    PANNumber: "",
    AadhaarNumber: "",
  });

  // Check if speech recognition is supported
  if ("webkitSpeechRecognition" in window) {
    console.log("Congratulations");
  } else {
    console.log("Speech recognition is not supported in this browser.");
  }

  // Function to handle voice input
  const handleVoiceInput = (inputField) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    // Handle voice recognition results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputField.value = transcript;
    };

    recognition.start();
  };

  // Function to handle form input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm(data);

    if (isFormValid) {
      // Get existing data from local storage or create an empty array
      let existingData = JSON.parse(localStorage.getItem("formData")) || [];

      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      // Add the current form data to the existing data
      existingData.push(data);

      // Store the updated data in local storage
      localStorage.setItem("formData", JSON.stringify(existingData));
      console.log("Data submitted:", data);
    }
  }

  // Function to validate form data
  const validateForm = (formData) => {
    let isValid = true;

    // Regular expressions for validation
    const namePattern = /^[A-Za-z\s]+$/;
    const statePattern = /^[A-Za-z\s]+$/;
    const districtPattern = /^[A-Za-z\s]+$/;
    const villagePattern = /^[A-Za-z\s]+$/;
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadhaarPattern = /^[0-9]{12}$/;

    // Validation checks
    if (!namePattern.test(formData.FirstName)) {
      isValid = false;
      alert(
        "First Name is not valid. It should contain only letters and spaces."
      );
    }

    if (!namePattern.test(formData.LastName)) {
      isValid = false;
      alert(
        "Last Name is not valid. It should contain only letters and spaces."
      );
    }

    if (!statePattern.test(formData.State)) {
      isValid = false;
      alert("State is not valid. It should contain only letters and spaces.");
    }

    if (!districtPattern.test(formData.District)) {
      isValid = false;
      alert(
        "District is not valid. It should contain only letters and spaces."
      );
    }

    if (!villagePattern.test(formData.Village)) {
      isValid = false;
      alert("Village is not valid. It should contain only letters and spaces.");
    }

    if (!panPattern.test(formData.PANNumber)) {
      isValid = false;
      alert(
        "PAN Number is not valid. It should match the pattern: AAAAA9999A."
      );
    }

    if (!aadhaarPattern.test(formData.AadhaarNumber)) {
      isValid = false;
      alert("Aadhaar Number is not valid. It should be a 12-digit number.");
    }

    return isValid;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h4>Address details</h4>

        {Object.keys(data).map((fieldName, index) => (
          <div className="form-group" key={index}>
            <div className="input-with-label">
              <label htmlFor={fieldName} className="impressive-label">
                {fieldName}
                {fieldName !== "AadhaarNumber" && <span className="required-field">*</span>}
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  placeholder={`Enter ${fieldName}`}
                  id={fieldName}
                  name={fieldName}
                  value={data[fieldName]}
                  onChange={handleInput}
                  required
                />
                <button
                  className="voice-button"
                  onClick={() =>
                    handleVoiceInput(document.getElementById(fieldName))
                  }
                >
                  <BsFillMicFill />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;


