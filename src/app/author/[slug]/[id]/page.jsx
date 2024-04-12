import _ from "lodash";
import NewAuthorUI from '@components/Dumuc/NewAuthor';

const AuthorPage = async ({params, searchParams}) => {
  return (
    <NewAuthorUI params={params} searchParams={searchParams}/>
  );
};

export default AuthorPage;
