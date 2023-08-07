import { useReducer, useCallback } from "react";
import { makeRequest, Body, Method } from "@/lib/request";

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
  error?: string | null;
  responseData?: Body;
  identifier?: ReqestIdentifier;
};

type ReducerAction = {
  type: ReducerActionType;
  identifier?: ReqestIdentifier;
  responseData?: Body;
  errorMessage?: string;
};

const initialState = {
  loading: false,
  error: null,
  responseData: null,
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
        data: action.responseData,
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
    isLoading: requestState.loading,
    responseData: requestState.responseData,
    error: requestState.error,
    sendRequest: sendRequest,
    reqIdentifer: requestState.identifier,
    clear: clear,
  };
};

export default useRequest;
