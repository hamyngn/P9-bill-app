/**
 * @jest-environment jsdom
 */

import { screen, waitFor, fireEvent } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store"
import { ROUTES } from "../constants/routes"

jest.mock("../app/store", () => mockStore)
describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and create a new bill but didn't fill input date and I click on Send button", () => {
    test("Then it should render NewBill page", async () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const inputExpenseType = screen.getByTestId("expense-type");
      inputExpenseType.getElementsByTagName('option')[0].selected = true;
      expect(inputExpenseType.value).toBe("Transports");
      const inputExpenseName = screen.getByTestId("expense-name");
      fireEvent.change(inputExpenseName, { target: { value: "Vol Paris Londre" } });
      expect(inputExpenseName.value).toBe("Vol Paris Londre");
      const datepicker = screen.getByTestId("datepicker");
      expect(datepicker.value).toBe("");
      const amount = screen.getByTestId("amount");
      fireEvent.change(amount, { target: { value: "300" } });
      expect(amount.value).toBe("300");
      const vat = screen.getByTestId("vat");
      fireEvent.change(vat, { target: { value: "70" } });
      expect(vat.value).toBe("70");
      const pct = screen.getByTestId("pct");
      fireEvent.change(pct, { target: { value: "20" } });
      expect(pct.value).toBe("20");
      let file = new File([""], "chucknorris.png", { type: "image/png" });
      let uploader = screen.getByTestId("file");
      await waitFor(() =>
        fireEvent.change(uploader, {
          target: { files: [file] },
        })
      );
      let image = document.getElementById("file");
      expect(image.files[0].name).toBe("chucknorris.png");
      expect(image.files.length).toBe(1);
      const form = screen.getByTestId("form-new-bill");
      const handleSubmit = jest.fn((e) => e.preventDefault());
      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(screen.getByTestId("form-new-bill")).toBeTruthy(); 
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and create a new bill but the file is incorrect format", () => {
    test("Then it should show an alert", async () => {
      document.body.innerHTML = NewBillUI()
      const inputExpenseType = screen.getByTestId("expense-type");
      inputExpenseType.getElementsByTagName('option')[0].selected = true;
      expect(inputExpenseType.value).toBe("Transports");
      const datepicker = screen.getByTestId("datepicker");
      fireEvent.mouseDown(datepicker);
      fireEvent.change(datepicker, { target: { value: "2020-01-01" } });
      fireEvent.click(datepicker)
      expect(datepicker.value).toBe("2020-01-01");
      const inputExpenseName = screen.getByTestId("expense-name");
      fireEvent.change(inputExpenseName, { target: { value: "Vol Paris Londre" } });
      expect(inputExpenseName.value).toBe("Vol Paris Londre");
      const amount = screen.getByTestId("amount");
      fireEvent.change(amount, { target: { value: "300" } });
      expect(amount.value).toBe("300");
      const vat = screen.getByTestId("vat");
      fireEvent.change(vat, { target: { value: "70" } });
      expect(vat.value).toBe("70");
      const pct = screen.getByTestId("pct");
      fireEvent.change(pct, { target: { value: "20" } });
      expect(pct.value).toBe("20");
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        email: "johndoe@email.com",
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const store = jest.fn();
      global.alert = jest.fn();
      const newBill = new NewBill({document, onNavigate, store, localStorage: window.localStorage})
      const handleChangeFile = jest.fn(newBill.handleChangeFile)
      let file = new File([""], "chucknorris", { type: "image/png" });
      let uploader = screen.getByTestId("file");
      uploader.addEventListener('change', handleChangeFile)
      await waitFor(() =>
      fireEvent.change(uploader, {
          target: { files: [file] },
        })
      );
      let image = document.getElementById("file");
      expect(image.files[0].name).toBe("chucknorris");
      expect(image.files.length).toBe(1);
      expect(handleChangeFile).toHaveBeenCalled();
      expect(global.alert).toBeCalledWith("Uploaded file is not a valid image. Only JPG, PNG and JPEG files are allowed.");
    })
  })
})

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and create a new bill in correct format", () => {
    test("Then the bill will be submited", async () => {
      document.body.innerHTML = NewBillUI()
      const inputExpenseType = screen.getByTestId("expense-type");
      inputExpenseType.getElementsByTagName('option')[0].selected = true;
      expect(inputExpenseType.value).toBe("Transports");
      const datepicker = screen.getByTestId("datepicker");
      fireEvent.mouseDown(datepicker);
      fireEvent.change(datepicker, { target: { value: "2020-01-01" } });
      fireEvent.click(datepicker)
      expect(datepicker.value).toBe("2020-01-01");
      const inputExpenseName = screen.getByTestId("expense-name");
      fireEvent.change(inputExpenseName, { target: { value: "Vol Paris Londre" } });
      expect(inputExpenseName.value).toBe("Vol Paris Londre");
      const amount = screen.getByTestId("amount");
      fireEvent.change(amount, { target: { value: "300" } });
      expect(amount.value).toBe("300");
      const vat = screen.getByTestId("vat");
      fireEvent.change(vat, { target: { value: "70" } });
      expect(vat.value).toBe("70");
      const pct = screen.getByTestId("pct");
      fireEvent.change(pct, { target: { value: "20" } });
      expect(pct.value).toBe("20");
      
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        email: "johndoe@email.com",
      }))
/*       Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => null),
          setItem: jest.fn(() => null),
        },
        writable: true,
      }); */
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const store = null;
      let uploader = screen.getByTestId("file");
      const newBill = new NewBill({document, onNavigate, store, localStorage: window.localStorage})
      const handleChangeFile = jest.fn(newBill.handleChangeFile);
      uploader.addEventListener("change", handleChangeFile)
      let file = new File([""], "chucknorris.png", { type: "image/png" });
      await waitFor(() =>
      fireEvent.change(uploader, {
          target: { files: [file] },
        })
      );
      let image = document.getElementById("file");
      expect(image.files[0].name).toBe("chucknorris.png");
      expect(image.files.length).toBe(1);
      expect(handleChangeFile).toHaveBeenCalled();
      const handleSubmit = jest.fn(newBill.handleSubmit)
      const form = screen.getByTestId("form-new-bill");
      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(handleSubmit).toHaveBeenCalled();
      expect(screen.getByTestId("tbody")).toBeTruthy();
    })
  })
})
