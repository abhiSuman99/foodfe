import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Total Price: {data.totalPrice.toFixed(1)}/-</Text>
        <Text>GST (18%): {data.gstAmount.toFixed(1)}/-</Text>
        <Text>Final Price: {data.finalPrice.toFixed(1)}/-</Text>
      </View>
      <View style={styles.section}>
        <Text>Items:</Text>
        {data.items.map((item, index) => (
          <Text key={index}>{`${index + 1}. ${item.name} - Quantity: ${item.qty}, Option: ${item.size}, Amount: ${item.price}/-`}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
