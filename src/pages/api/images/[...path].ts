import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path, ...query } = req.query;

  const targetUrl = `http://161.53.174.14/wp-content/uploads/${
    Array.isArray(path) ? path.join("/") : typeof path === "string" ? path : "/"
  }`;

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      params: query,
      headers: req.headers,
      responseType: "arraybuffer",
    });

    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "application/octet-stream"
    );
    res.setHeader("Content-Length", response.headers["content-length"] || "0");

    res.status(response.status).send(response.data);
  } catch (error) {
    res
      .status(axios.isAxiosError(error) ? error.response?.status || 500 : 500)
      .json({ message: "Internal Server Error" });
  }
}
