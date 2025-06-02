// src/Components/UiKits/TableSkeletonLoader/index.jsx

import React, { useState, useEffect } from "react"
import { Card, CardBody } from "reactstrap"
import { SkeletonTable } from './skeleton-components'

export default function TableSkeletonLoader() {
  const [loading, setLoading] = useState(true)
  const [candidateList, setCandidateList] = useState([])

  // Sample table columns
  const tableColumns = [
    { name: "Name", selector: (item) => item.name },
    { name: "Email", selector: (item) => item.email },
    { name: "Status", selector: (item) => item.status },
    { name: "Actions", selector: (item) => item.actions },
    { name: "Date", selector: (item) => item.date },
  ]

  // Sample data
  const sampleData = [
    {
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      actions: "Edit | Delete",
      date: "2024-01-15",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      actions: "Edit | Delete",
      date: "2024-01-14",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "Pending",
      actions: "Edit | Delete",
      date: "2024-01-13",
    },
  ]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setCandidateList(sampleData)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const maxHeight = 600

  const toggleLoading = () => {
    setLoading(true)
    setCandidateList([])

    setTimeout(() => {
      setLoading(false)
      setCandidateList(sampleData)
    }, 2000)
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px" }}>
          Table with Skeleton Loader
        </h1>
        <p style={{ color: "#666", marginBottom: "16px" }}>
          Reactstrap table with proper skeleton loading animation
        </p>
        <button
          onClick={toggleLoading}
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : "Reload Data"}
        </button>
      </div>

      <Card>
        <CardBody style={{ padding: 0 }}>
          <div
            style={{
              maxHeight: `${maxHeight}px`,
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
              position: "relative",
            }}
          >
            <table
              style={{
                width: "100%",
                tableLayout: "auto",
                borderSpacing: 0,
              }}
            >
              <thead>
                <tr
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 10,
                    borderBottom: "2px solid #E0E0E0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {tableColumns.map((column, index) => (
                    <th
                      key={index}
                      style={{
                        padding: "16px 18px",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#333333",
                        textAlign: index === 0 ? "left" : "center",
                      }}
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <SkeletonTable columns={tableColumns} rowCount={8} />
                ) : (
                  candidateList.map((candidate, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor: "white",
                        borderBottom: "1px solid #E0E0E0",
                      }}
                    >
                      {tableColumns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          style={{
                            padding: "26px 20px",
                            wordBreak: "break-word",
                            fontSize: "14px",
                            color: "#333333",
                            textAlign: colIndex === 0 ? "left" : "center",
                          }}
                        >
                          {column.selector(candidate)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}