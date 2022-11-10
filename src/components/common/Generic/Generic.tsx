import { useSubCategory } from 'requests/SubCategory/subCategory.service';
import MedecineMenu from '../MedecineMenu/MedecineMenu';

interface Props {
  id: string;
}

const Indication = ({ id }: Props) => {
  const { data } = useSubCategory({
    variables: { idCategory:id },
    fetchPolicy: 'no-cache',
  });  return <MedecineMenu count={false} pathname="/" data={data?.subCategorys?.data} />;
};

export default Indication;
