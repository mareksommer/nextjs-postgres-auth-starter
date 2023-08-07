import { useReducer, useCallback } from "react";
import { makeRequest, Body, Method } from "@/lib/request";

type RequestExtra = string | number | {} | null | undefined;
type ReqestIdentifier = string | null | undefined;
type ReducerActionType = "SEND" | "RESPONSE" | "ERROR" | "CLEAR";

type ReuqestReducer = (
  state: ReducerState,
  action: ReducerAction
) => ReducerState;

type ReducerState = {
  loading: boolean;
  error?: string | null;
  data?: Body;
  extra?: RequestExtra;
  identifier?: ReqestIdentifier;
};

type ReducerAction = {
  type: ReducerActionType;
  identifier?: ReqestIdentifier;
  responseData?: Body;
  extra?: RequestExtra;
  errorMessage?: string;
};

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const requestReducer: ReuqestReducer = (
  prevRequestState: ReducerState,
  action: ReducerAction
): ReducerState => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...prevRequestState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
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
      reqExtra: RequestExtra,
      reqIdentifer: ReqestIdentifier
    ) => {
      dispatchRequest({ type: "SEND", identifier: reqIdentifer });
      makeRequest(url, method, body)
        .then((responseData: Body) => {
          dispatchRequest({
            type: "RESPONSE",
            responseData: responseData,
            extra: reqExtra,
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
    isLoading: requestState.loading,
    data: requestState.data,
    error: requestState.error,
    sendRequest: sendRequest,
    reqExtra: requestState.extra,
    reqIdentifer: requestState.identifier,
    clear: clear,
  };
};

export default useRequest;
