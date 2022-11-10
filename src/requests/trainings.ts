import { MutationHookOptions, QueryHookOptions } from '@apollo/client';
import gql from 'graphql-tag';
import { useLocalLazyQuery, useLocalMutation, useLocalQuery } from 'hooks/apollo';


export const trainingsQuery = gql`
  query trainings($perPage: Int $idCategory:ID $idSubCategories:ID $name:String) {
    trainings(perPage: $perPage, sort: "name",idCategory:$idCategory idSubCategories:$idSubCategories name:$name) {
      data {
        id
        name
        price
        membersNumber
        description
        image
        dateEnd
        dateStart
        idTrainer{ fullName}
        idCategory {
          id
          name
        }
    idSubCategories{
      id
      name
    }
    
      }
    }
  }
`;
export interface MedicamentsArguments {
  perPage?: number;
  name?: string;
  training?: string;
}
export interface MedicamentsData {
  data: {
    id: string;
    name: string;
  }[];
}
export interface GeneralResultSearch {
  trainings: Medicine[];
  classes: { id: string; name: string }[];
  dcis: { id: string; name: string }[];
}
const GeneralSearchQuery = gql`
  query generalSearch($name: String) {
    generalSearch(name: $name) {
      trainings {
        id
        name
      }
      classes {
        id
        name
      }

      dcis {
        id
        name
      }
    }
  }
`;
export const useLazyMedicaments = (
  options: QueryHookOptions<{ trainings: MedicamentsData }, MedicamentsArguments> = {},
) => useLocalLazyQuery(trainingsQuery, options);
export const useMedicaments = (options: QueryHookOptions<{ trainings: MedicamentsData }, MedicamentsArguments> = {}) =>
  useLocalQuery(trainingsQuery, options);
export const useGeneralSearch = (
  options: QueryHookOptions<{ generalSearch: GeneralResultSearch }, MedicamentsArguments> = {},
) => useLocalQuery(GeneralSearchQuery, options);
export const useLazyGeneralSearch = (
  options: QueryHookOptions<{ generalSearch: GeneralResultSearch }, MedicamentsArguments> = {},
) => useLocalLazyQuery(GeneralSearchQuery, options);



export interface MedicinesArguments {
  perPage?: number;
  sort?: string;
  page?: number;
  order?: number;
  dci?: string;
  start?: string;
  classe?: string;
}
export interface Medicine {
  id: string;
  name: string;
  image: string;
  lab: string;
  video: {
    QRstylo: string;
    stylo: string;
    QRseringue: string;
    seringue: string;
    url: string;
    qrCode: string;
  };
  dci: {
    id: string;
    name: string;
  };
  classe: {
    id: string;
    name: string;
  };
}
export interface Medicines {
  data: Medicine[];
  count: number;
  page: number;
  totalPages: number;
}

export interface SuggestionsList {
  classdiffdispositifdiff: Medicine[];
  classdiffdispositifmeme: Medicine[];
  dispositifdifferentt: Medicine[];
  dispositifmemee: Medicine[];
}
export const useMedicine = (options: QueryHookOptions<{ trainings: any }, any> = {}) =>
  useLocalQuery(trainingsQuery, options);
export const useLazyMedicines = (options: QueryHookOptions<{ trainings: any }, any> = {}) =>
  useLocalLazyQuery(trainingsQuery, options);


export const MedicamentsCountQuery = gql`
  query trainings($dci: ID, $classe: ID) {
    trainings(dci: $dci, classe: $classe) {
      count
      page
      data {
        id
        name
        image
        video {
          url
          qrCode
        }
        qr {
          seringue
          stylo
        }
        classe {
          id
          name
        }
        dci {
          id
          name
        }
      }
      totalPages
    }
  }
`;
export const addFavouriteQuery = gql`
  mutation CreateFavorites($training: ID!) {
    createFavorites(training: $training) {
      id
      user {
        id
      }
      training {
        id
        name
      }
    }
  }
`;
export interface AddFavouriteResponseData {
  id: string;
  user: {
    id: string;
  };
  training: {
    id: string;
    name: string;
  };
}



export const useAddFavourite = (
  options: MutationHookOptions<{ createFavorites: AddFavouriteResponseData }, { training: string }> = {},
) => useLocalMutation(addFavouriteQuery, options);
export const TrainingByIdQuery = gql`
  query training($id: ID!) {
    training(id: $id) {
      id
      name
      price
      membersNumber
      description
      image
      idTrainer{ fullName}
      idCategory {
        id
        name
      }
  idSubCategories{
    id
    name
  }
  idTrainer{fullName}
  dateStart
  dateEnd

}
  }
`;

export const useTrainingById = (options: QueryHookOptions<any> = {}) =>
  useLocalQuery(TrainingByIdQuery, options);


export const relatedMedicineQuery = gql`
  query RelatedMedicine($training: ID!, $sort: String, $order: Int, $dci: ID, $start: String, $classe: ID) {
    relatedMedicine(training: $training, sort: $sort, order: $order, dci: $dci, start: $start, classe: $classe) {
      previous
      next
    }
  }
`;
interface RelatedMedicineArguments {
  training: string;
  sort?: string;
  order?: number;
  dci?: string;
  start?: string;
  classe?: string;
}
interface RelatedMedicineResponse {
  relatedMedicine: {
    previous?: string;
    next?: string;
  };
}
export const useRelatedMedicine = (options: QueryHookOptions<RelatedMedicineResponse, RelatedMedicineArguments> = {}) =>
  useLocalQuery(relatedMedicineQuery, options);
