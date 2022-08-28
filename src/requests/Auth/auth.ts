import { MutationHookOptions } from '@apollo/client';
import gql from 'graphql-tag';
import { useLocalMutation } from 'hooks/apollo';
import { Token, User } from './types';

export const loginMutation = gql`
  mutation Login($username: String!, $password: String!, $recordarUsuario: Boolean) {
    login(username: $username, password: $password, recordarUsuario: $recordarUsuario) {
      user {
        id
        user_name
        client_id
        role
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;
// register
export const registerMutation = gql`
  mutation register(
    $market_types: String
    $frequence_envoi: String
    $nbre_colis: String
    $poids_moyen: String
    $nature_biens: String
    $adresse_expediteur: String
    $gouvernerat_expediteur: String
    $delegation_expediteur: String
    $localite_expediteur: String
    $code_postal_expediteur: Int
    $id_prestataire_frmlogin: String
    $code_deleg_exp: String
    $code_gov_exp: String
    $code_localite_exp: String
    $profil: String
    $societe_expediteur: String
    $nom_prenom_expediteur: String
    $matricule_fiscal: String
    $website_pagefb: String
    $tel_expediteur: String
    $tel_expediteur2: String
    $fax_a: String
    $mail_expediteur: String
    $user_password: String
    $user_password_confirm: String
  ) {
    register(
      market_types: $market_types
      frequence_envoi: $frequence_envoi
      nbre_colis: $nbre_colis
      poids_moyen: $poids_moyen
      nature_biens: $nature_biens
      adresse_expediteur: $adresse_expediteur
      gouvernerat_expediteur: $gouvernerat_expediteur
      delegation_expediteur: $delegation_expediteur
      localite_expediteur: $localite_expediteur
      code_postal_expediteur: $code_postal_expediteur
      id_prestataire_frmlogin: $id_prestataire_frmlogin
      code_deleg_exp: $code_deleg_exp
      code_gov_exp: $code_gov_exp
      code_localite_exp: $code_localite_exp
      profil: $profil
      societe_expediteur: $societe_expediteur
      nom_prenom_expediteur: $nom_prenom_expediteur
      matricule_fiscal: $matricule_fiscal
      website_pagefb: $website_pagefb
      tel_expediteur: $tel_expediteur
      tel_expediteur2: $tel_expediteur2
      fax_a: $fax_a
      mail_expediteur: $mail_expediteur
      user_password: $user_password
      user_password_confirm: $user_password_confirm
    ) {
      user {
        id
        user_name
        client_id
        role
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;
export const useRegister = (options: MutationHookOptions<{ register: LoginData }> = {}) =>
  useLocalMutation(registerMutation, options);
export interface LoginArguments {
  username: string;
  password: string;
  recordarUsuario?: boolean;
}
export interface LoginData {
  user: User;
  token: Token;
}

export const useLogin = (options: MutationHookOptions<{ login: LoginData }, LoginArguments> = {}) =>
  useLocalMutation(loginMutation, options);

export const refreshMutation = gql`
  mutation Refresh($refreshToken: String!, $user_name: String!) {
    refresh(refreshToken: $refreshToken, user_name: $user_name) {
      user {
        id
        user_name
        client_id
        role
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export interface RefreshArguments {
  refreshToken: string;
  user_name: string;
}

export const useRefresh = (options: MutationHookOptions<LoginData, RefreshArguments> = {}) =>
  useLocalMutation<LoginData, RefreshArguments>(refreshMutation, options);

export const resetMutation = gql`
  mutation Reset($password: String!, $token: String!) {
    reset(password: $password, token: $token) {
      user {
        id
        user_name
        client_id
        role
      }
      token {
        tokenType
        accessToken
        refreshToken
        expiresIn
      }
    }
  }
`;

export interface ResetArguments {
  password: string;
  token: string;
}
export interface ResetData {
  user: User;
  token: Token;
}

export const useReset = (options: MutationHookOptions<{ reset: ResetData }, ResetArguments> = {}) =>
  useLocalMutation(resetMutation, options);
export const logoutMutation = gql`
  mutation logout {
    logout
  }
`;
export interface LogoutData {
  logout: string;
}
export const useLogout = (options: MutationHookOptions<{ logout: LogoutData }, ResetArguments> = {}) =>
  useLocalMutation(logoutMutation, options);
