
import dynamic from "next/dynamic";
const SOSPageContent = dynamic( () => {
  return import( '@components/SOSPageContent' );
}, { ssr: false } );

const SOSPage = () => {
  return <SOSPageContent />
}

export default SOSPage;
