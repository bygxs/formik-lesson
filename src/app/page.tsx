// src/app/page.tsx
"use client";

import { useFormik } from 'formik';
import { useState } from 'react';

interface FormData {
  injuryCause: string;
  incidentDate: string;
  medicalMalpracticeInjury: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
}

const Step1 = ({ formik }: { formik: any }) => (
  <div>
    <label htmlFor="injuryCause">What caused your Injury?</label>
    <select id="injuryCause" {...formik.getFieldProps('injuryCause')}>
      <option value="">Select an option</option>
      <option value="motorVehicle">Motor Vehicle Accident</option>
      <option value="workInjury">Injured at Work</option>
      <option value="medicalMalpractice">Medical Malpractice</option>
      <option value="wrongfulDeath">Wrongful Death</option>
      <option value="dogBite">Dog Bite</option>
      <option value="slipAndFall">Slip & Fall</option>
      <option value="personalInjury">Personal Injury</option>
      <option value="otherInjury">Other Injury</option>
    </select>
    {formik.touched.injuryCause && formik.errors.injuryCause ? (
      <div>{formik.errors.injuryCause}</div>
    ) : null}
  </div>
);

const Step2 = ({ formik }: { formik: any }) => (
  <div>
    <label htmlFor="incidentDate">When did the incident occur?</label>
    <select id="incidentDate" {...formik.getFieldProps('incidentDate')}>
      <option value="">Select an option</option>
      <option value="withinYear">Within the last year</option>
      <option value="oneToTwoYears">1-2 years ago</option>
      <option value="twoToThreeYears">2-3 years ago</option>
      <option value="moreThanThreeYears">More than 3 years ago</option>
    </select>
    {formik.touched.incidentDate && formik.errors.incidentDate ? (
      <div>{formik.errors.incidentDate}</div>
    ) : null}
  </div>
);

const Step3 = ({ formik }: { formik: any }) => (
  <div>
    <label htmlFor="medicalMalpracticeInjury">
      What Injuries did you or your loved one sustain from Medical Malpractice?
    </label>
    <select id="medicalMalpracticeInjury" {...formik.getFieldProps('medicalMalpracticeInjury')}>
      <option value="">Select an option</option>
      <option value="lossOfAbility">Loss of Physical Ability</option>
      <option value="birthInjury">Birth Injury</option>
      <option value="death">Death of Patient</option>
      <option value="misdiagnosis">Misdiagnosis</option>
      <option value="other">Other</option>
    </select>
    {formik.touched.medicalMalpracticeInjury && formik.errors.medicalMalpracticeInjury ? (
      <div>{formik.errors.medicalMalpracticeInjury}</div>
    ) : null}
  </div>
);

const Step4 = ({ formik }: { formik: any }) => (
  <div>
    <label htmlFor="description">Please describe what happened</label>
    <textarea id="description" {...formik.getFieldProps('description')} />
    {formik.touched.description && formik.errors.description ? (
      <div>{formik.errors.description}</div>
    ) : null}
  </div>
);

const Step5 = ({ formik }: { formik: any }) => (
  <div>
    <label htmlFor="firstName">First Name</label>
    <input type="text" id="firstName" {...formik.getFieldProps('firstName')} />
    {formik.touched.firstName && formik.errors.firstName ? (
      <div>{formik.errors.firstName}</div>
    ) : null}

    <label htmlFor="lastName">Last Name</label>
    <input type="text" id="lastName" {...formik.getFieldProps('lastName')} />
    {formik.touched.lastName && formik.errors.lastName ? (
      <div>{formik.errors.lastName}</div>
    ) : null}

    <label htmlFor="email">Email Address</label>
    <input type="email" id="email" {...formik.getFieldProps('email')} />
    {formik.touched.email && formik.errors.email ? (
      <div>{formik.errors.email}</div>
    ) : null}

    <label htmlFor="phone">Phone Number</label>
    <input type="tel" id="phone" {...formik.getFieldProps('phone')} />
    {formik.touched.phone && formik.errors.phone ? (
      <div>{formik.errors.phone}</div>
    ) : null}

    <label htmlFor="zipCode">Zip / Postal Code</label>
    <input type="text" id="zipCode" {...formik.getFieldProps('zipCode')} />
    {formik.touched.zipCode && formik.errors.zipCode ? (
      <div>{formik.errors.zipCode}</div>
    ) : null}
  </div>
);

const MyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<FormData>({
    initialValues: {
      injuryCause: '',
      incidentDate: '',
      medicalMalpracticeInjury: '',
      description: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
    },
    validate: (values) => {
      const errors: Partial<FormData> = {};

      if (!values.injuryCause) errors.injuryCause = 'Required';
      if (!values.incidentDate) errors.incidentDate = 'Required';
      if (values.injuryCause === 'medicalMalpractice' && !values.medicalMalpracticeInjury) errors.medicalMalpracticeInjury = 'Required';
      if (!values.description) errors.description = 'Required';
      if (currentStep === 5) { // Validation for step 5
        if (!values.firstName) errors.firstName = 'Required';
        if (!values.lastName) errors.lastName = 'Required';
        if (!values.email) errors.email = 'Required';
        if (!values.phone) errors.phone = 'Required';
        if (!values.zipCode) errors.zipCode = 'Required';
      }

      return errors;
    },

    onSubmit: (values) => {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log(values);
        setIsSubmitting(false);
        alert("Form submitted successfully!");
      }, 500);
    },
  });

  const handleNext = () => {
    formik.validateForm().then(() => {
      if (Object.keys(formik.errors).length === 0) {
        setCurrentStep(currentStep + 1);
      }
    });
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formik={formik} />;
      case 2:
        return <Step2 formik={formik} />;
      case 3:
        return <Step3 formik={formik} />;
      case 4:
        return <Step4 formik={formik} />;
      case 5:
        return <Step5 formik={formik} />;
      default:
        return null;
    }
  };return (
    <form onSubmit={formik.handleSubmit} className="container mx-auto p-4">
      {renderStep()}
  
      <div className="mt-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Previous
          </button>
        )}
        {currentStep < 5 && (
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        )}
        {currentStep === 5 && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        )}
        {isSubmitting && <p>Submitting...</p>}
      </div>
    </form>
  );}

  export default MyForm; 