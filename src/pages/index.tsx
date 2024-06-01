import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cardSchema = z.object({
  cardNumber: z.string().regex(/^(?:\d{4}\s){3}\d{4}$/),
  cardHolder: z.string().regex(/^([a-zA-Z]{2,}\s)+[a-zA-Z]{2,}$/),
  expDateMonth: z.string().refine((month) => {
    const monthNumber = parseInt(month, 10);
    return monthNumber >= 1 && monthNumber <= 12;
  }),
  expDateYear: z.string().refine((year) => {
    const yearNumber = parseInt(year, 10);
    return yearNumber >= 25 && yearNumber <= 30;
  }),
  cvc: z
    .string()
    .regex(/^[0-9]+$/)
    .length(3),
});

export default function Home() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expDateMonth, setExpDateMonth] = useState("");
  const [expDateYear, setExpDateYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardHolderError, setCardHolderError] = useState("");
  const [expDateMonthError, setExpDateMonthError] = useState("");
  const [expDateYearError, setExpDateYearError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const formData = { cardNumber, cardHolder, expDateMonth, expDateYear, cvc };
    let isValid = true;
    setIsSubmitted(true);

    if (!cardNumber) {
      setCardNumberError("This field is required");
      isValid = false;
    } else {
      const cardNumberResult =
        cardSchema.shape.cardNumber.safeParse(cardNumber);
      setCardNumberError(
        cardNumberResult.success ? "" : "Must be a valid card number",
      );
      if (!cardNumberResult.success) isValid = false;
    }

    if (!cardHolder) {
      setCardHolderError("This field is required");
      isValid = false;
    } else {
      const cardHolderResult =
        cardSchema.shape.cardHolder.safeParse(cardHolder);
      setCardHolderError(
        cardHolderResult.success ? "" : "Must be a valid card holder name",
      );
      if (!cardHolderResult.success) isValid = false;
    }

    if (!expDateMonth) {
      setExpDateMonthError("This field is required");
      isValid = false;
    } else {
      const expDateMonthResult =
        cardSchema.shape.expDateMonth.safeParse(expDateMonth);
      setExpDateMonthError(
        expDateMonthResult.success ? "" : "Must be a valid month",
      );
      if (!expDateMonthResult.success) isValid = false;
    }

    if (!expDateYear) {
      setExpDateYearError("This field is required");
      isValid = false;
    } else {
      const expDateYearResult =
        cardSchema.shape.expDateYear.safeParse(expDateYear);
      setExpDateYearError(
        expDateYearResult.success ? "" : "Must be a valid year",
      );
      if (!expDateYearResult.success) isValid = false;
    }

    if (!cvc) {
      setCvcError("This field is required");
      isValid = false;
    } else {
      const cvcResult = cardSchema.shape.cvc.safeParse(cvc);
      setCvcError(cvcResult.success ? "" : "Must be a valid cvc");
      if (!cvcResult.success) isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
  };

  const handleCardNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let newCardNumber = event.target.value.replace(/\D/g, "");
    if (newCardNumber.length > 4) {
      newCardNumber = newCardNumber.replace(/(.{4})/g, "$1 ").trim();
    }
    setCardNumber(newCardNumber);
  };

  const removeCardNumber = () => {
    setCardNumber("");
  };

  // Styles
  const labelStyle =
    "tracking-widest lg:self-start text-very-dark-violet uppercase my-2";
  const inputStyle =
    "mb-6 rounded-md border-2 h-14 text-xl tracking-wider placeholder:text-dark-grayish-violet/50 placeholder:text-bold text-semibold border-light-grayish-violet px-4 py-2 focus:outline-none border-gradient";
  const inputErrorStyle = "border-red";

  return (
    <>
      <Head>
        <title>Card Details</title>
        <meta name="description" content="card-details-form" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <main className="relative flex min-h-screen min-w-[440px] flex-col items-center justify-start bg-white font-spaceGrotesk md:flex-row">
        {/* Backgrounds */}
        <div className="fixed w-full min-w-[440px]">
          <Image
            src={"/images/bg-main-mobile.png"}
            width={100}
            height={100}
            alt="Mobile Background"
            className="block h-[340px] w-full object-cover md:hidden"
          />
          <Image
            src={"/images/bg-main-desktop.png"}
            width={100}
            height={100}
            alt="Desktop Background"
            className="hidden h-screen w-1/3 object-cover md:block"
          />
        </div>
        {/* Cards */}
        <div className="fixed top-14 w-full min-w-[440px] md:left-5 md:h-full md:w-1/2">
          <div className="absolute right-4 md:bottom-80 md:left-10 md:-translate-y-5 lg:left-40">
            <Image
              src={"/images/bg-card-back.png"}
              width={200}
              height={100}
              alt="Card Back"
              className="h-52 w-auto md:shadow-2xl"
            />
          </div>
          <div className="relative left-4 top-32 flex md:left-2 md:top-44 lg:left-24">
            <Image
              src={"/images/bg-card-front.png"}
              width={200}
              height={100}
              alt="Card Front"
              className="h-56 w-auto shadow-2xl"
            />
            <div className="absolute h-56 w-[405px] flex-col p-6">
              <div className="flex h-1/2 w-full items-start justify-start">
                <Image
                  src={"/images/card-logo.svg"}
                  width={100}
                  height={50}
                  alt="Card Logo"
                  className="h-10 w-auto"
                />
              </div>
              <div className="flex h-1/2 w-full flex-col justify-between pt-4 text-white">
                <p className="text-center text-[27px] tracking-widest">
                  {cardNumber === "" ? "0000 0000 0000 0000" : cardNumber}
                </p>
                <div className="flex justify-between text-sm text-light-grayish-violet">
                  <p className="uppercase">
                    {cardHolder === "" ? "Jane Appleseed" : cardHolder}
                  </p>
                  <p>{`${expDateMonth === "" ? "00" : expDateMonth}/${expDateYear === "" ? "00" : expDateYear}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Form */}
        {!isValid ? (
          <form
            onSubmit={handleSubmit}
            className="mt-[50vh] flex h-[57vh] w-full flex-col p-8 md:ml-[55vw] md:mt-0 md:w-[45vw] lg:items-center"
          >
            <label htmlFor="cardHolder" className={`${labelStyle}`}>
              Cardholder Name
            </label>
            <div className="relative flex w-full flex-col">
              <input
                className={`${inputStyle} ${cardHolderError ? ` ${inputErrorStyle}` : ""}`}
                type="text"
                placeholder="e.g. Jane Appleseed"
                id="cardHolder"
                name="cardHolder"
                value={cardHolder}
                onChange={(event) => {
                  setCardHolder(event.target.value);
                  if (isSubmitted && !isValid) {
                    validateForm();
                  }
                }}
              />
              {cardHolderError && (
                <p className="absolute bottom-0 text-sm text-red">
                  {cardHolderError}
                </p>
              )}
            </div>
            <label htmlFor="cardNumber" className={`${labelStyle}`}>
              Card Number
            </label>
            <div className="relative flex w-full flex-col">
              <input
                className={`${inputStyle} ${cardNumberError ? ` ${inputErrorStyle}` : ""} w-full`}
                type="text"
                placeholder="0000 0000 0000 0000"
                id="cardNumber"
                name="cardNumber"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => {
                  handleCardNumberInputChange(e);
                  if (isSubmitted && !isValid) {
                    validateForm();
                  }
                }}
              />
              {cardNumber && (
                <button
                  onClick={removeCardNumber}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-300/50 text-xl text-very-dark-violet/60"
                >
                  <FontAwesomeIcon className="w-4" icon={faXmark} />
                </button>
              )}
              {cardNumberError && (
                <p className="absolute bottom-0 text-sm text-red">
                  {cardNumberError}
                </p>
              )}
            </div>
            <div className="flex flex-nowrap gap-4">
              <div className="relative flex w-1/2 flex-col">
                <label htmlFor="expDateMonth" className={`${labelStyle}`}>
                  Exp. date (mm/yy)
                </label>
                <div className="flex justify-start gap-2 pr-2">
                  <input
                    className={`${inputStyle} ${expDateMonthError ? ` ${inputErrorStyle}` : ""} w-1/2`}
                    type="text"
                    placeholder="MM"
                    id="expDateMonth"
                    name="expDateMonth"
                    value={expDateMonth}
                    onChange={(event) => {
                      setExpDateMonth(event.target.value);
                      if (isSubmitted && !isValid) {
                        validateForm();
                      }
                    }}
                  />
                  <input
                    className={`${inputStyle} ${expDateYearError ? ` ${inputErrorStyle}` : ""} w-1/2`}
                    type="text"
                    placeholder="YY"
                    id="expDateYear"
                    name="expDateYear"
                    value={expDateYear}
                    onChange={(event) => {
                      setExpDateYear(event.target.value);
                      if (isSubmitted && !isValid) {
                        validateForm();
                      }
                    }}
                  />
                </div>
                {expDateMonthError || expDateYearError ? (
                  <p className="absolute bottom-0 text-sm text-red">
                    {expDateMonthError || expDateYearError}
                  </p>
                ) : null}
              </div>
              <div className="relative flex w-1/2 flex-col md:self-end">
                <label className={`${labelStyle}`} htmlFor="cvc">
                  CVC
                </label>
                <input
                  className={`${inputStyle} ${cvcError ? ` ${inputErrorStyle}` : ""}`}
                  type="text"
                  placeholder="e.g. 123"
                  name="cvc"
                  id="cvc"
                  maxLength={3}
                  value={cvc}
                  onChange={(event) => {
                    setCvc(event.target.value);
                    if (isSubmitted && !isValid) {
                      validateForm();
                    }
                  }}
                />
                {cvcError && (
                  <p className="absolute bottom-0 text-sm text-red">
                    {cvcError}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`z-10 mt-6 rounded-xl bg-very-dark-violet py-6 text-2xl tracking-wider text-white focus:outline-none lg:w-full`}
            >
              Confirm
            </button>
          </form>
        ) : (
          <div className="mt-[43vh] flex h-[57vh] w-full flex-col items-center justify-center p-8 md:ml-[55vw] md:mt-0">
            <Image
              src={"/images/icon-complete.svg"}
              width={100}
              height={100}
              alt="Complete Icon"
            />
            <h1 className="mt-16 text-4xl font-semibold uppercase text-very-dark-violet md:text-center">
              Thank you!
            </h1>
            <p className="mb-10 mt-7 text-xl font-light text-dark-grayish-violet md:text-center">
              We&apos;ve added your card details
            </p>
            <button
              className={`z-10 mt-12 w-full cursor-pointer rounded-xl bg-very-dark-violet py-6 text-2xl tracking-wider text-white focus:outline-none`}
              onClick={() => {
                setIsSubmitted(false);
                setIsValid(false);
              }}
            >
              Continue
            </button>
          </div>
        )}
      </main>
    </>
  );
}
