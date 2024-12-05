import { Grid, Divider, Typography, Paper, Box } from "@mui/material";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { getGstAmount, getTotalAmount } from "../../../../pages/Calls/helpers";
import dayjs, { LocalDayjs } from "../../../../utils/timezoneService";
import { styled } from '@mui/material/styles';
import ExpandableField from "../../../../atoms/expandable-text-field/ExpandableTextField";

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  marginBottom: theme.spacing(1),
}));

const FieldTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(0.5),
}));

const FieldValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

const ReadOnlyFields = () => {
  const { getValues } = useHookFormContext();
  const call = getValues('call_details');

  const gstin = call ? getGstAmount(call) : 'Not Applicable';
  const payableAmount = getTotalAmount(call?.cost_price, call?.payable_mins, true, false);
  const RevenurINR = call?.revenue_in_inr
  const RevenueUSD= call?.revenue_in_usd

  const fieldData = [
    {
      title: "Payable Amount:",
      value: `${Number(payableAmount).toFixed(0)} ${call?.cost_price_currency}`,
      isVisible: true
    },
    {
      title: "Revenue ₹:",
      value: `${Number(RevenurINR).toFixed(0)} INR`,
      isVisible: true
    },
    {
      title: "Revenue $:",
      value: `${Number(RevenueUSD).toFixed(0)} USD`,
      isVisible: true
    },
    {
      title: "GST Amount:",
      value: gstin||null,
      isVisible: true
    },
    {
      title: "Remark:",
      value: call?.remark || '',
      isVisible: true
    },
    {
      title: "Finance Remark:",
      value: call?.review_remarks
        ? `${call?.review_remarks} - ${call.reviewed_by.name} on ${LocalDayjs(call.reviewed_on).format("DD MMMM YYYY")}`
        : '',
      isVisible: true
    },
    {
      title: "15 CA:",
      value: call?.declaration_date ? LocalDayjs(call?.declaration_date)?.format("DD MMMM YYYY") : "",
      isVisible: true
    },
    {
      title: "Payment Date:",
      value: call?.transaction_meta?.payments?.map((payment: any) => 
        dayjs(payment?.payment_date).format('DD MMMM YYYY'))?.join(', ') || (call?.meta?.payment_date && dayjs(call?.meta?.payment_date).format('DD MMMM YYYY')) || null,
      isVisible: call?.transaction_meta?.payments || call?.meta?.payment_date
    },
  ];

  return (
    <Box sx={{ mx:2.5 }}>
    <Divider />
    <Grid container columnSpacing={4} rowSpacing={2} sx={{mt:1 }}>
      {fieldData.map((field, index) => (
        field.isVisible && (
          <Grid item xs={12} sm={6} key={index}>
            <FieldContainer>
              <FieldTitle>{field.title}</FieldTitle>
              <ExpandableField value={field?.value || ""} characterLimit={20} />
            </FieldContainer>
          </Grid>
        )
      ))}
    </Grid>
  </Box>

  );
};

export default ReadOnlyFields;