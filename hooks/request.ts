import { useReducer, useCallback } from "react";
import { makeRequest, Headers, Body, Method } from "@/lib/request";

type ReqestIdentifier =
  | string
  | { requestName: string; requestKey: number | string | {} }
  | null
  | undefined;
type ReducerActionType = "SEND" | "RESPONSE" | "ERROR" | "CLEAR";

type ReuqestReducer = (
  state: ReducerState,
  action: ReducerAction
) => ReducerState;

type ReducerState = {
  loading: boolean;
  errorMessage?: string | null;
  response?: Response | null;
  responseData?: Body;
  identifier?: ReqestIdentifier;
};

type ReducerAction = {
  type: ReducerActionType;
  identifier?: ReqestIdentifier;
  response?: Response;
  responseData?: Body;
  errorMessage?: string;
};

type Response = {
  ok: boolean;
  status: number;
  statusText: string;
  body?: Body;
  headers?: Headers;
};

const initialState = {
  loading: false,
  response: null,
  responseData: null,
  errorMessage: null,
  identifier: null,
};

const requestReducer: ReuqestReducer = (
  prevRequestState: ReducerState,
  action: ReducerAction
): ReducerState => {
  switch (action.type) {
    case "SEND":
      return {
        ...initialState,
        loading: true,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...prevRequestState,
        loading: false,
        response: action.response,
        responseData: action.responseData,
      };
    case "ERROR":
      return {
        ...prevRequestState,
        loading: false,
        response: action.response,
        errorMessage: action.errorMessage,
      };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Request Custom Hook: Reducer - Unknown actin type");
  }
};

const useRequest = () => {
  const [requestState, dispatchRequest] = useReducer(
    requestReducer,
    initialState
  );

  const clear = useCallback(() => dispatchRequest({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    (
      url: string,
      method: Method,
      body: Body,
      reqIdentifer: ReqestIdentifier
    ) => {
      dispatchRequest({ type: "SEND", identifier: reqIdentifer });
      makeRequest(url, method, body)
        .then((responseData: Body) => {
          dispatchRequest({
            type: "RESPONSE",
            responseData: responseData,
          });
        })
        .catch((error) => {
          dispatchRequest({
            type: "ERROR",
            errorMessage: "Something went wrong!",
          });
        });
    },
    []
  );

  return {
    sendRequest: sendRequest,
    clear: clear,
    isLoading: requestState.loading,
    response: requestState.response,
    responseData: requestState.responseData,
    errorMessage: requestState.errorMessage,
    reqIdentifer: requestState.identifier,
  };
};

export default useRequest;
