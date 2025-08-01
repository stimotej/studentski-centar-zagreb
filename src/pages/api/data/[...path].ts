import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path, ...query } = req.query;
  const targetUrl = `${process.env.NEXT_PUBLIC_SC_API_URL}${
    Array.isArray(path) ? path.join("/") : typeof path === "string" ? path : "/"
  }`;

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      params: query,
      headers: req.headers,
    });

    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value as string);
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(axios.isAxiosError(error) ? error.response?.status || 500 : 500)
      .json({ message: "Internal Server Error" });
  }
}
