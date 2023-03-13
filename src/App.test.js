import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import fetchMock from "jest-fetch-mock";

describe("App", () => {
  
  beforeEach(() => {
    fetchMock.doMock();
  });

  it("should render a title, label, and button", () => {
    render(<App />);

    const linkElement = screen.getByText("Weather App");
    expect(linkElement).toBeInTheDocument();

    const searchText = screen.getByText("Search City :");
    expect(searchText).toBeDefined();

    const submitText = screen.getByText("Submit");
    expect(submitText).toBeDefined();
  });

  it("should enable the submit button only when the input is not empty", () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText("Search City");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(searchInput, {
      target: { value: "" },
    });
    expect(submitButton).toBeDisabled();

    fireEvent.change(searchInput, {
      target: { value: "Bangalore" },
    });
    expect(submitButton).not.toBeDisabled();
  });

  it("show loader when data fetch from api call", async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search City");
    fireEvent.change(searchInput, { target: { value: "Bangalore" } });

    const button = screen.getByText("Submit");
    fireEvent.click(button);

    await (() => {
      const loader = screen.getByText("loading");
      expect(loader).toBeTruthy();
    });
  });

  it("should render the CurrentWeather component correctly", async () => {
    const weatherData = [{ id: 1, name: "Pune" }];
    fetchMock.mockResolvedValue({
      status: 200,
      json: jest.fn(() => weatherData),
    });

    render(<App />);

    await (() => {
      const cityName = screen.getByText("Pune");
      expect(cityName).toBeInTheDocument();
    });

    expect(screen.queryByText("Data Not Found! Please Enter Other City!")).not.toBeInTheDocument();
  });

  test("show error message when API fail", async () => {
    fetchMock.mockReject(() => Promise.reject("API error"));

    render(<App />);

    await(() => {
      const errorMsg = screen.getByText(
        "Data Not Found! Please Enter Other City!"
      );
      expect(errorMsg).toBeInTheDocument();
    });
  });

});