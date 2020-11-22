import {Helmet} from "react-helmet";
import React from "react";
import {observable, reaction} from "mobx";
import CircularProgress from "@material-ui/core/CircularProgress";
import {fromPromise} from 'mobx-utils';

// xhr.open("POST", "https://app.nanonets.com/api/v2/OCR/Model/{{model_id}}/LabelFile/?async=true");
//url : 'https://app.nanonets.com/api/v2/Inferences/Model/{{model_id}}/ImageLevelInferences/{{id}}',

const modalID = '0b57a751-2753-4859-b71a-41eb1d14d5a0';
const url = `https://app.nanonets.com/api/v2/OCR/Model/${modalID}`;
const inference_url = `https://app.nanonets.com/api/v2/Inferences/Model/${modalID}`;

export class ImageRecognitionPage extends React.Component {
    inferenceResponse = observable({response: undefined});

    isLoading = observable(false);

    sadas = reaction(
        ()=> this.inferenceResponse.response,
        r => console.log(r),
        {fireImmediately: true}
    )

    handleChange = async (e) => {
        this.isLoading = true;
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

        this.fetchInference(result[0].id);
    }

    fetchInference = (fileID) => {
        this.inferenceResponse.response = fromPromise(
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
                        setTimeout(() => this.fetchInference(fileID), 5000);
                    } else {
                        this.isLoading = true;
                        return result;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        );
    }

    renderProgress = () => {
        if (!this.inferenceResponse.response) { return; }
        return this.inferenceResponse.response.case({
            fulfilled: t => {
                console.log(t)
                return <div>{t}</div>
            },
            pending: t => {
                console.log('dsjdisjdi')
            }
        })
    }


    render() {
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
                    onChange={this.handleChange}
                />
            </div>
            { this.renderProgress() }
        </>
    }

}