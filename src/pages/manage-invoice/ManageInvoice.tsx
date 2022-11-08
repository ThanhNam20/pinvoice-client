import InvoiceTableComponent from "components/InvoiceTable.component";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { RootState } from "store/store";
import { Invoice } from "types/Invoice";

const ManageInvoice = () => {
  const dispatch = useAppDispatch();
  const listInvoicesState = useAppSelector(
    (state: RootState) => state.invoices
  );
  const [listInvoices, setListInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const listInvoices = initListInvoices(listInvoicesState.listInvoices);
    setListInvoices(listInvoices);
  }, [listInvoicesState]);

  const initListInvoices = (data: Invoice[]) => {
    return data.map((item, index) => ({
      ...item,
      indexNumber: index + 1,
      releaseStatus: item.isRelease ? "Đã phát hành" : "Chưa phát hành",
    }));
  };

  return (
    <>
      <div>ManageInvoice</div>
      <InvoiceTableComponent listInvoices={listInvoices} />
    </>
  );
};

export default ManageInvoice;
