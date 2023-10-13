import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import "dotenv/config";

const fetchQr = async () => {
  try {
    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.get[
      "Referer-Control-Allow-Origin"
    ] = `${process.env.WHATSAPP_BASE_URL}`;
    axios.defaults.headers.get["Host"] = `${process.env.WHATSAPP_BASE_URL}`;
    const url = `${process.env.WHATSAPP_BASE_URL}/api/default/auth/qr`;
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        accept: "*/*",
      },
    });

    const imageBuffer = Buffer.from(response.data, "binary").toString("base64");
    return `data:${response.headers["content-type"]};base64,${imageBuffer}`;
  } catch (err) {
    // if (err.message === "Can get QR code only in SCAN_QR_CODE status. The current status is 'STARTING'") {
    //   return 'loading'
    // }
    return "/sessions/start";
  }
};

const fetchStartSession = async () => {
  const { data: existingSession } = await axios.get(
    `${process.env.WHATSAPP_BASE_URL}/api/sessions/`,
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (existingSession[0]?.status === "WORKING") {
    return;
  }

  const url = `${process.env.WHATSAPP_BASE_URL}/api/sessions/start`;

  const requestData = {
    name: "default",
    config: {
      proxy: null,
      webhooks: [
        {
          url: "https://httpbin.org/post",
          events: ["message"],
          hmac: null,
          retries: null,
          customHeaders: null,
        },
      ],
    },
  };

  await axios.post(url, requestData, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  await new Promise((res) =>
    res(() => {
      setTimeout(() => null, 1000);
    })
  );
};

export const handler: APIGatewayProxyHandler = async (event) => {
  let base64String: string = "";

  const qr = await fetchQr();

  if (qr === "/sessions/start") {
    await fetchStartSession();

    const error = new Error(
      "Your session has been started, please retry this same endpoint."
    );
    error.name = "Retry request";

    return {
      statusCode: 307,
      body: JSON.stringify({
        error: error.name,
        message: error.message,
      }),
    };
  }

  base64String = qr;

  return {
    body: JSON.stringify({
      image: base64String,
    }),
    statusCode: 200,
  };
};
