import type { Endpoint } from "../types/endpoint";

const API_URL = "http://localhost:5000/api/";

const request = async <T>(
    endpoint: Endpoint,
    options?: RequestInit
): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json() as Promise<T>;
};

export const getData = <T>(
    endpoint: Endpoint
): Promise<T> => {
    return request<T>(`${endpoint}/` as Endpoint);
};

export const postData = <T>(
    endpoint: Endpoint,
    body: unknown
): Promise<T> => {
    return request<T>(`${endpoint}/` as Endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
};

export const putData = <T>(
    endpoint: Endpoint,
    id: number | string,
    body: unknown
): Promise<T> => {
    return request<T>(`${endpoint}/${id}` as Endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
};

export const deleteData = async (
    endpoint: Endpoint,
    id: number
): Promise<void> => {
    const response = await fetch(`${API_URL}${endpoint}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
};