/**
 * @jest-environment jsdom
 */

import { screen, waitFor, fireEvent } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store"
import { ROUTES, ROUTES_PATH } from "../constants/routes"
import router from "../app/Router"

jest.mock("../app/store", () => mockStore)

/* describe("Given I am connected as an employee", () => {
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
      const store = mockStore;
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
      expect(image.value).toBe("");
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
        type: "Employee", email: "e@e" 
      }))
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      let uploader = screen.getByTestId("file");
      const store = mockStore;
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
}) */

// test d'intégration POST
describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and create a new bill in correct format then submit this form", () => {
    test("fetches bills from mock API POST ", async () => {
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "e@e" }));
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getByText("Envoyer une note de frais"))
      const inputExpenseType = screen.getByTestId("expense-type");
      inputExpenseType.getElementsByTagName('option')[0].selected = true;    
      const datepicker = screen.getByTestId("datepicker");
      fireEvent.mouseDown(datepicker);
      fireEvent.change(datepicker, { target: { value: "2020-01-01" } });
      fireEvent.click(datepicker) 
      const inputExpenseName = screen.getByTestId("expense-name");
      fireEvent.change(inputExpenseName, { target: { value: "Vol Paris Londre" } }); 
      const amount = screen.getByTestId("amount");
      fireEvent.change(amount, { target: { value: "300" } });
      const vat = screen.getByTestId("vat");
      fireEvent.change(vat, { target: { value: "70" } });
      const pct = screen.getByTestId("pct");
      fireEvent.change(pct, { target: { value: "20" } }); 
      const uploader = screen.getByTestId("file");
      let file = new File([""], "chucknorris.png", { type: "image/png" });
      await waitFor(() =>
      fireEvent.change(uploader, {
          target: { files: [file] },
        })
      );
      const submit = document.getElementById("btn-send-bill")
      submit.click();
      await waitFor(() => screen.getByText("Mes notes de frais"))
      const test1  = await screen.getByText("test1")
      expect(test1).toBeTruthy()
      const test2  = await screen.getByText("test2")
      expect(test2).toBeTruthy()
      const test3  = await screen.getByText("test3")
      expect(test3).toBeTruthy()
      const encore  = await screen.getByText("encore")
      expect(encore).toBeTruthy()
    })
  describe("When an error occurs on API", () => {
    beforeEach(() => {
      jest.spyOn(mockStore, "bills")
      Object.defineProperty(
          window,
          'localStorage',
          { value: localStorageMock }
      )
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee',
        email: "e@e"
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.appendChild(root)
      router()
    })
    test("post a bill from an API and fails with 400 message error", async () => {

      mockStore.bills.mockImplementationOnce(() => {
        return {
          list : () =>  {
            return Promise.reject(new Error("Erreur 400"))
          }
        }})
      window.onNavigate(ROUTES_PATH.Bills)
      await new Promise(process.nextTick);
      const message = await screen.getByText(/Erreur 400/)
      expect(message).toBeTruthy()
    })

    test("post a bill from an API and fails with 500 message error", async () => {

      mockStore.bills.mockImplementationOnce(() => {
        return {
          list : () =>  {
            return Promise.reject(new Error("Erreur 500"))
          }
        }})

      window.onNavigate(ROUTES_PATH.Bills)
      await new Promise(process.nextTick);
      const message = await screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
  })
})