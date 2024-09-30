
const inflationRates = {
    1970: 1.5,
    1971: 0,
    1972: 23.7,
    1973: 32.1,
    1974: 56,
    1975: 16.1,
    1976: 10.4,
    1977: 7.6,
    1978: 9.3,
    1979: 16.2,
    1980: 11.6,
    1981: 11.1,
    1982: 11.7,
    1983: 12.1,
    1984: 10.1,
    1985: 11.3,
    1986: 11.6,
    1987: 11.8,
    1988: 7.4,
    1989: 9.5,
    1990: 8.7,
    1991: 8.5,
    1992: 5.1,
    1993: 3.4,
    1994: 3.4,
    1995: 7.0,
    1996: 6.6,
    1997: 7.2,
    1998: 8.9,
    1999: 8.6,
    2000: 2.8,
    2001: 1.9,
    2002: 2.8,
    2003: 5.0,
    2004: 5.8,
    2005: 7.0,
    2006: 7.2,
    2007: 9.1,
    2008: 8.9,
    2009: 5.4,
    2010: 8.1,
    2011: 10.7,
    2012: 8.7,
    2013: 7.5,
    2014: 7.0,
    2015: 6.4,
    2016: 5.9,
    2017: 5.4,
    2018: 5.6,
    2019: 5.5,
    2020: 5.7,
    2021: 5.6,
    2022: 6.15,
    2023: 9.016,
    // 2024: Data to be updated when available
};

document.getElementById("inflationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const startYear = parseInt(document.getElementById("startYear").value);
    const endYear = parseInt(document.getElementById("endYear").value);
    const amount = parseFloat(document.getElementById("amount").value);

    // Input Validation
    if (startYear > endYear) {
        document.getElementById("result").style.color = "red";
        document.getElementById("result").textContent = "Start year cannot be later than end year.";
        return;
    }

    if (startYear < 1970 || endYear > 2024) {
        document.getElementById("result").style.color = "red";
        document.getElementById("result").textContent = "Please enter years between 1970 and 2024.";
        return;
    }

    let totalInflation = 1; // Represents the multiplier for inflation

    for (let year = startYear; year <= endYear; year++) {
        if (inflationRates[year] !== undefined) {
            totalInflation *= (1 + inflationRates[year] / 100);
        } else {
            document.getElementById("result").style.color = "red";
            document.getElementById("result").textContent = `Inflation data not available for year ${year}.`;
            return;
        }
    }

    const adjustedAmount = amount * totalInflation;

    // Convert to Bangla numbers
    const convertToBangla = (num) => {
        const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().replace(/[0-9]/g, (digit) => banglaDigits[digit]);
    };

    // Convert input values and result to Bangla
    const banglaStartYear = convertToBangla(startYear);
    const banglaEndYear = convertToBangla(endYear);
    const banglaAmount = convertToBangla(amount.toLocaleString());
    const banglaAdjustedAmount = convertToBangla(adjustedAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));

    // Display the result with Bangla numbers
    document.getElementById("result").style.color = "#28a745";
    document.getElementById("result").textContent = ` ${banglaStartYear} সালের ${banglaAmount} টাকা ${banglaEndYear} সালের ${banglaAdjustedAmount} টাকার সমমূল্যের!`;
});