export interface ITraining {
  id: string;
  name: string;
  price: string;
  membersNumber: number;
  idTrainer: {
    id: string;
    fullName: string;
  };
  idCategory: { name: string; id: string };
  idSubCategories: { name: string; id: string };
  image: string[];
  description: string;
  dateStart: string;
  dateEnd: string;
}
