export type InterestType = 'FIXED' | 'DECLINING';
export type Installment = { month: number, principalInstallment: number, interest: number, totalInstallment: number };
export type CalculateInstallmentProps = {
  installments: Installment[],
  totalPrincipal: number,
  totalInterest: number,
  grandTotal: number
}

export function calculateInstallment(
  principal: number,
  interestRate: number, // Dianggap bulanan
  months: number,
  rounding: number,
  interestType: InterestType
): CalculateInstallmentProps {

  const monthlyInterestRate = interestRate / 100;
  const installmentPlan: Installment[] = [];

  let balance = principal;
  let totalPrincipalInstallment = 0;
  let totalPrincipal = 0;
  let totalInterest = 0;

  const basePrincipalInstallment = Math.ceil((principal / months) / rounding) * rounding;

  // Perhitungan untuk bulan-bulan sebelum yang terakhir
  for (let i = 1; i < months; i++) {
    totalPrincipalInstallment += basePrincipalInstallment;

    // Hitung bunga sesuai tipe bunga
    const interest = Math.ceil(
      (interestType === 'FIXED' ? principal : balance) * monthlyInterestRate / rounding
    ) * rounding;

    installmentPlan.push({
      month: i,
      principalInstallment: basePrincipalInstallment,
      interest,
      totalInstallment: basePrincipalInstallment + interest
    });

    totalPrincipal += basePrincipalInstallment;
    totalInterest += interest;

    if (interestType === 'DECLINING') {
      balance -= basePrincipalInstallment;
    }
  }

  // Perhitungan untuk bulan terakhir
  const lastPrincipalInstallment = principal - totalPrincipalInstallment;
  const lastInterest = Math.ceil(
    (interestType === 'FIXED' ? principal : balance) * monthlyInterestRate / rounding
  ) * rounding;

  installmentPlan.push({
    month: months,
    principalInstallment: lastPrincipalInstallment,
    interest: lastInterest,
    totalInstallment: lastPrincipalInstallment + lastInterest
  });

  totalPrincipal += lastPrincipalInstallment;
  totalInterest += lastInterest;

  const grandTotal = totalPrincipal + totalInterest;

  return {
    installments: installmentPlan,
    totalPrincipal,
    totalInterest,
    grandTotal
  };
}

