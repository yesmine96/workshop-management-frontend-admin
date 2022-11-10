import gql from 'graphql-tag';

import { MutationHookOptions, QueryHookOptions, useLazyQuery } from '@apollo/client';
import { useLocalQuery, useLocalMutation } from 'hooks/apollo';

import { Note } from './types';

export const notesQuery = gql`
  query notes($perPage: Int, $page: Int) {
    notes(perPage: $perPage, page: $page, sort: "title") {
      data {
        title
        id
        training {
          id
          name
          image
        }

        createdAt
        content
      }
      totalPages
      page
    }
  }
`;

export interface NotesData {
  data: {
    id: string;
    training: {
      id: string;
      name: string;
      image: string;
    };
    createdAt: string;
    content: string;
    title: string;
  }[];
  page: number;
  totalPages: number;
}

export const useNotes = (options: QueryHookOptions<{ notes: NotesData }, {}> = {}) =>
  useLocalQuery(notesQuery, options);

export const useLazyNotes = (options: MutationHookOptions<{ notes: NotesData }> = {}) =>
  useLazyQuery(notesQuery, options);
export const removeNoteMuttation = gql`
  mutation removeNote($id: ID) {
    removeNote(id: $id)
  }
`;

interface RemoveNoteArgs {
  id: string;
}

export const useDeleteNote = (options: MutationHookOptions<string, RemoveNoteArgs> = {}) =>
  useLocalMutation(removeNoteMuttation, options);

export const addNotes = gql`
  mutation createNote($title: String!, $training: ID!, $content: String!) {
    createNote(title: $title, training: $training, content: $content) {
      id
      user {
        id
      }
      training {
        name
      }
      title
      content
    }
  }
`;
interface AddNotes {
  id: string;
  content: string;
  title: string;
  user: {
    id: string;
  };
  training: {
    name: string;
  };
}

export const useAddNote = (options?: MutationHookOptions<{ addNote: AddNotes }, {}>) =>
  useLocalMutation(addNotes, options);

export const updateNote = gql`
  mutation updateNote($title: String, $training: ID, $content: String, $id: ID!) {
    updateNote(title: $title, training: $training, content: $content, id: $id) {
      user {
        id
      }
      training {
        name
      }
      title
      content
    }
  }
`;

export interface UpdateNote {
  content: string;
  title: string;

  training: {
    name: string;
  };
}

export const useUpdateNote = (options?: MutationHookOptions<{ updateNote: UpdateNote }, {}>) =>
  useLocalMutation(updateNote, options);

export const noteByIdQuery = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      user {
        id
      }
      training {
        id
        name
        image
      }
      title
      content
      createdAt
    }
  }
`;

export interface NoteByIdData {
  id: string;
  user: {
    id: string;
  };
  training: {
    id: string;
    name: string;
    image: string;
  };
  title: string;
  content: string;
  createdAt: string;
}

export const useNotesById = (options: QueryHookOptions<{ note: NoteByIdData }, {}> = {}) =>
  useLocalQuery(noteByIdQuery, options);

export const trainingNoteQuery = gql`
  query trainingNote($training: ID!) {
    trainingNote(training: $training) {
      id
      training {
        id
        name
      }
      title
      content
    }
  }
`;

export const useMedicineNote = (options: QueryHookOptions<{ trainingNote: Note }, { training: string }> = {}) =>
  useLocalQuery(trainingNoteQuery, options);
