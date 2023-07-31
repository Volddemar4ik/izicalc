import { Helmet } from "react-helmet";

export default function HelmetMetatags({ metatagsData }) {

    return (
        <Helmet>
            <title>{metatagsData.name} crypto calculator</title>
            <meta
                name="title"
                content={`${metatagsData.name} crypto calculator`}
                data-react-helmet="true"
            />
            <meta
                name="description"
                content={`Calculate your potential profit or loss for your investment using free ${metatagsData.name} crypto calculator.`}
                data-react-helmet="true"
            />
            <link
                rel="canonical"
                href={metatagsData.url}
            />
        </Helmet>
    )
}