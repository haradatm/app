# Example of code using Google Speech-to-Text (for Bubble)

### Description

This code is a sample of Google Speech-to-Text for Bubble.

### Dependencies
- Python 3.7+
- google-cloud-speech 2.4+

In addition, please add the project folder to PYTHONPATH and `conda or pip install` the following packages:
- `pyaudio`
- `termcolor`
- `urllib`
- `json`

### Preparation ###

To run the client library, you must first set up authentication by creating a service account and setting an environment variable. Complete the following steps to set up authentication. For other ways to authenticate, see the [GCP authentication documentation](https://cloud.google.com/speech-to-text/docs/libraries?hl=ja#client-libraries-install-python).

### Usage ###
```
GOOGLE_APPLICATION_CREDENTIALS=%path_to_credentials% \
python speech2buble.py \
  --access_token %access token for Bubble% \
  --endpoint %endpoint url% \
  --user_id %user id to post% \
  --verbose
```
