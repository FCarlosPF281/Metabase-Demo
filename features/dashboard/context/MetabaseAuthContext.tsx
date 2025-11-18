'use client';

import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type State = {
    alias?: string | null;
    jwt?: string | null;
    providerKey: number;
};

type Action =
    | { type: 'SET_ALIAS'; alias?: string | null }
    | { type: 'SET_JWT'; jwt?: string | null }
    | { type: 'BUMP_KEY' };

const initialState: State = { alias: null, jwt: null, providerKey: 0 };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ALIAS':
            return { ...state, alias: action.alias ?? null };
        case 'SET_JWT':
            return { ...state, jwt: action.jwt ?? null };
        case 'BUMP_KEY':
            return { ...state, providerKey: state.providerKey + 1 };
        default:
            return state;
    }
}

const MetabaseAuthContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
} | null>(null);

export function MetabaseAuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MetabaseAuthContext.Provider value={{ state, dispatch }}>
            {children}
        </MetabaseAuthContext.Provider>
    );
}

export function useMetabaseAuth() {
    const ctx = useContext(MetabaseAuthContext);
    if (!ctx) throw new Error('useMetabaseAuth must be used within MetabaseAuthProvider');
    return ctx;
}
