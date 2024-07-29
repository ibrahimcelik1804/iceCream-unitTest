import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event";

test("Koşulların onaylanmasına göre button aktifliği", async () => {
  const user = userEvent.setup();
  // form birleşeni ekrana bas
  render(<Form />);
  // gerekli elamanları çağır
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  //1)checkbox tiksizdir
  expect(checkBox).not.toBeChecked();
  //2)button inaktiftir
  expect(button).toBeDisabled();
  //3)chechboxa tıkla
  // fireEvent.click(checkBox) => çok hızlı normal bir insan hızından çok fazla bunun yerine kullanıcı dostu userEvent kullanıcı benzeri davranıyor.
  // user event rtl react testing library
  await user.click(checkBox);
  //4)button aktiftir
  expect(button).toBeEnabled();
  //5)chebox'tan tiki kaldır
  await user.click(checkBox);
  //6) butona inaktiftir
  expect(button).toBeDisabled;
});

test("Onay butonu hover durumuna göre bildirim gözükür", async () => {
  const user = userEvent.setup();
  render(<Form />);
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  // normal şartlarda getByText'e çağıracagımız elemanın içindeki yazının tamamı veririz.
  // const popup = screen.getByText("Size gerçekten bir şey teslim etmeyeceğiz");
  // egerki exact degerini false yaparsak buna gerek kalmaz
  // const popup2 = screen.getByText("Size gerçekten ", { exact: false });
  //exact false mantığı gibi çalışan ama regex
  const popup = screen.getByText(/size gerçekten/i); // i> insensetive
  // 1) checkbox tikle
  await user.click(checkBox);
  // 2) bildirim gözükmüyor mu
  expect(popup).not.toBeVisible(); // opacity >0 || display!==none || visibty!==hidden
  // 3) mause butonun üzerine götür
  fireEvent.mouseEnter(button);
  // 4) bildirim gözüküyor mu
  expect(popup).toBeVisible();
  // 5) mouse'u butonun üzerinden çek
  fireEvent.mouseLeave(button);
  // 6) bildirim gözükmüyor mu
  expect(popup).not.toBeVisible();
});
