import {Helmet} from "react-helmet";
import React, {useState} from "react";
import {makeAutoObservable, observable, reaction} from "mobx";
import CircularProgress from "@material-ui/core/CircularProgress";
import {fromPromise} from 'mobx-utils';
import singletonGetter from '../lib/singletonGetter'
import {observer} from 'mobx-react'

// xhr.open("POST", "https://app.nanonets.com/api/v2/OCR/Model/{{model_id}}/LabelFile/?async=true");
//url : 'https://app.nanonets.com/api/v2/Inferences/Model/{{model_id}}/ImageLevelInferences/{{id}}',

const modalID = '0b57a751-2753-4859-b71a-41eb1d14d5a0';
const url = `https://app.nanonets.com/api/v2/OCR/Model/${modalID}`;
const inference_url = `https://app.nanonets.com/api/v2/Inferences/Model/${modalID}`;

class ViewState {
    static get = singletonGetter(ViewState)
    inferenceResponse;
    setInferenceResponse(response) {
        this.inferenceResponse = response;
    }
    constructor() {
        makeAutoObservable(this)
    }
}

const ImageRecognitionPageInner = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = async (e) => {
        setIsLoading(true);
        const fileBLob = e.target.files[0];

        if (!fileBLob) { return; }

        let data = new FormData();
        data.append('file', fileBLob);

        const result = await fetch(`${url}/LabelFile/?async=true`, {
            method: 'POST',
            body: data,
            mode: 'cors',
            headers: {
                authorization: "Basic " + btoa("1rPLp1E5nqZ6lj7V7yM_4Qbaf_JnzFcY:")
            }

        })
            .then(response => response.json())
            .then(result => {
                return result.result;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        fetchInference(result[0].id);
    }

    const fetchInference = (fileID) => {
        ViewState.get().setInferenceResponse(fromPromise(
            fetch(`${inference_url}/ImageLevelInferences/${fileID}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    authorization: "Basic " + btoa("1rPLp1E5nqZ6lj7V7yM_4Qbaf_JnzFcY:")
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.message.includes('try again')) {
                        setTimeout(() => fetchInference(fileID), 5000);
                    } else {
                        setIsLoading(true);
                        return result;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        ))
    }

    const renderProgress = () => {
        if (!ViewState.get().inferenceResponse) { return <div>UNDEFINED</div>; }
        return ViewState.get().inferenceResponse.case({
            fulfilled: t => {
                return <div>FULLFILLED</div>
            },
            pending: t => {
                return <div>PENDING</div>
            }
        })
    }

        return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Upload Receipt | My Pantry Space</title>
            </Helmet>
            <div>
                <input
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={handleChange}
                />
            </div>
            { renderProgress() }
        </>
}

export const ImageRecognitionPage = observer(ImageRecognitionPageInner);