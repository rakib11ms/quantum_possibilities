"use client";
import React, { useEffect, useState } from "react";
import "./CampaignFormStyle.css";
import CampaignStepForm from "@/component/ManageAds/CampaignStepForm";

import "react-datepicker/dist/react-datepicker.css";
import {
    Grid,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import axiosInstance from "../../../utils/axios";
const steps = [
    { label: "Details", value: 0 },
    { label: "Locations", value: 1 },
    { label: "Ad Format", value: 2 },
    { label: "Upload Assets", value: 3 },
    { label: "Preview & Launch", value: 4 },
];
const CampaignForm = ({ pageData, setPageData }) => {
    const [step, setStep] = useState(1);
    return (
        <div className="row">
            <div className="col-lg-8 p-0">
                <div className="ui-block">
                    <CampaignStepForm pageData={pageData} setPageData={setPageData} step={step} setStep={setStep} />
                </div>
            </div>
            <div className="col-lg-4">
                <div className="ui-block-container">
                    <Stepper
                        className="container pt-2"
                        activeStep={step - 1}
                        orientation="vertical"
                        sx={{
                            "& .MuiStepConnector-line": {
                                minHeight: 0,
                                height: "6px",
                                borderLeft: "0.1px dotted black",
                            },
                            "& .css-14sza3e-MuiStepLabel-root": {
                                py: "6px",
                            },
                            "& .MuiSvgIcon-root": {
                                fontSize: "1.2rem",
                            },
                            "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
                                color: "green",
                            },
                        }}
                    >
                        {steps.map((step) => (
                            <Step key={step.value}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                {/* <div className="ui-block-container-card">
                    <div className="container pt-2">
                        <p className="ui-block-container-card-title">Estimated Audience</p>
                        <hr
                            style={{
                                marginTop: "5px",
                            }}
                        />
                        <p className="ui-block-container-card-header">3.5 - 5.2 Lakhs</p>
                        <p className="ui-block-container-card-text">
                            Based on the targeted locations
                        </p>
                    </div>
                </div>
                <div className="ui-block-container-card">
                    <div className="container pt-2">
                        <p className="ui-block-container-card-title">Estimated Reach</p>
                        <hr
                            style={{
                                marginTop: "5px",
                            }}
                        />
                        <p className="ui-block-container-card-header">50k - 1 Lakh</p>
                        <p className="ui-block-container-card-text">
                            Based on the selected parameters
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CampaignForm;
