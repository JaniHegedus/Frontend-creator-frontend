import axios from "axios";
import {NotifyMessage} from "@/Components/Common/ToastNotification/Notification";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const getHello = async () =>
{
    await axios
        .get(`${backendUrl}/hello`,
            {
            }
        )
        .then((res) =>
        {
            const message = res.data["message"].toString()
            NotifyMessage("success","success", message);
        })
        .catch((e) => {
            NotifyMessage("error", e.message);
        });
}
export const getAiLabels = async () =>
{
    await axios
        .get(`${backendUrl}/test/aiImageTest/labels`,
            {
            }
        )
        .then((res) =>
        {
            const message = res.data.responses[0]
            console.info(message)
            NotifyMessage("success","Server Responded with:", "Label Annotations");
        })
        .catch((e) => {
            NotifyMessage("error", e.message);
        });
}
export const getAiTexts = async () =>
{
    await axios
        .get(`${backendUrl}/test/aiImageTest/texts`,
            {
            }
        )
        .then((res) =>
        {
            const message = res.data.responses[0]
            console.info(message)
            console.info("Server Responded with:", "Text Annotations");
        })
        .catch((e) => {
            NotifyMessage("error", e.message);
        });
}
export const getAiColors = async () =>
{
    await axios
        .get(`${backendUrl}/test/aiImageTest/colors`,
            {
            }
        )
        .then((res) =>
        {
            const message = res.data.responses[0]
            console.info(message)
            NotifyMessage("success","Server Responded with:", "Color Annotations");
        })
        .catch((e) => {
            NotifyMessage("error", e.message);
        });
}
export const getCode = async () =>
{
    await axios
        .get(`${backendUrl}/test/PageGenerationTest`,
            {
            }
        )
        .then((res) =>
        {
            const message = res.data.responses
            console.info(message)
            NotifyMessage("success","Server Responded with:", "Code Generation");
        })
        .catch((e) => {
            NotifyMessage("error", e.message);
        });
}