# Example of code using Google Speech-to-Text (for Bubble)

### Description

This code is a sample of Google Speech-to-Text for Bubble.

Viewer application via WebSocket is now supported.

### Dependencies
- Python 3.7+
- google-cloud-speech 2.4+

In addition, please add the project folder to PYTHONPATH and `conda or pip install` the following packages:
- `pyaudio`
- `termcolor`
- `urllib`
- `json`

### Preparation ###

To run the client library, you must first set up authentication by creating a service account and setting an environment variable. Complete the following steps to set up authentication, see the [GCP authentication documentation](https://cloud.google.com/speech-to-text/docs/libraries?hl=ja#client-libraries-install-python).

### Usage ###

```
GOOGLE_APPLICATION_CREDENTIALS=%path_to_credentials% \
python speech2buble.py \
  --access_token %access_token_for_Bubble% \
  --endpoint %endpoint_url% \
  --user_id %user_id_to_post% \
  --verbose


Listening, type "Ctrl + C" to stop.

End (ms)       Transcript Results/Status
=====================================================
0: NEW REQUEST
23190: 売り上げが落ち込んでいるということですが十分な対策をしてディナーの営業を再開します感染防止の対策はしっかりしながらお食事中ワインを楽しんで頂きたい
```
