import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import 'dotenv/config'

interface Response {
  name: string;
  status: string;
  config: Config;
  me?: any;
}

interface Config {
  proxy?: any;
  webhooks: Webhook[];
}

interface Webhook {
  url: string;
  events: string[];
  hmac?: any;
  retries?: any;
  customHeaders?: any;
}

const fetchCurrentSession = async () => {
  const url = `${process.env.WHATSAPP_BASE_URL}/api/sessions`;
  const { data } = await axios.get<Response>(url, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  console.log(data)

  const { config, name, ...rest } = data?.[0]

  return {
    ...rest,
  };
};

export const handler: APIGatewayProxyHandler = async (event) => {
  const response = await fetchCurrentSession();

  return {
    body: JSON.stringify({
      ...response,
    }),
    statusCode: 200,
  };
};
