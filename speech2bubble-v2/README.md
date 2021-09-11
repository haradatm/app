# Example of code using Google Speech-to-Text (for Bubble) V2

## Description

This code is a sample of Google Speech-to-Text for Bubble.

Viewer application via WebSocket is now supported.

## Dependencies
- Python 3.7+
- google-cloud-speech 2.4+

In addition, please add the project folder to PYTHONPATH and `conda or pip install` the following packages:
- `pyaudio`
- `termcolor`
- `urllib`
- `json`

## Preparation

To run the client library, you must first set up authentication by creating a service account and setting an environment variable. Complete the following steps to set up authentication, see the [GCP authentication documentation](https://cloud.google.com/speech-to-text/docs/libraries?hl=ja#client-libraries-install-python).

## Usage (Doctor's side)

```
GOOGLE_APPLICATION_CREDENTIALS=%path_to_credentials% \
python speech2buble.py \
  --access_token %access_token_for_Bubble% \
  --endpoint %endpoint_url% \
  --user_id %user_id_to_post% \
  --reciever='Patient' \
  --sender='Doctor' \
  --verbose
```

## Usage (Patient's side)

```
GOOGLE_APPLICATION_CREDENTIALS=%path_to_credentials% \
python speech2buble.py \
  --access_token %access_token_for_Bubble% \
  --endpoint %endpoint_url% \
  --user_id %user_id_to_post% \
  --reciever='Doctor' \
  --sender='Patient' \
  --verbose
```

## Console output example

```
Listening, type "Ctrl + C" to stop.

End (ms)       Transcript Results/Status
=====================================================
0: NEW REQUEST
23190: 売り上げが落ち込んでいるということですが十分な対策をしてディナーの営業を再開します感染防止の対策はしっかりしながらお食事中ワインを楽しんで頂きたい
```

---

<br>

## Additional preparations (required) ###

- WebSocket Server

- Viewer Application

<br>

## (a) WebSocket Server

Please installation and launch on the Doctor's side.

<br>

### Dependencies
- Node.js v15.5+

In addition, please `npm init` and `npm install` the following packages in the project folder `ws_server`:
- `express`
- `ws`
- `moment`


```
% cd ws_server
% npm init
% npm install express ws moment --save
```

<br>

### Usage
```
% node app.js

WebSocket server listening at ws://localhost:6060
```

<br>

## (b) Viewer Application

Please installation and launch on both the Doctor's and Patient's side.

<br>

### Dependencies
- MacOS v11 +

<br>

### Install

Please unzip `viewer_app/Conversation_Viewer.zip` and place it in your `Applications` folder.

<br>

### Usege (Doctor's Side)

Click on the `Conversation_Viewer` application in your `Applications` folder to launch it.

When the application launch, select `Doctor` and input the following URL, then click the `Connect` button.

```
ws://localhost:6060
```

<br>

### Usege (Patient's Side)

Click on the `Conversation_Viewer` application in your `Applications` folder to launch it.

When the application launch, select `Patient` and input the following URL, then click the `Connect` button.

```
ws://(IP address to Doctor's machine):6060
```