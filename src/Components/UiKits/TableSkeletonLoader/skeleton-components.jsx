// src/Components/UiKits/TableSkeletonLoader/skeleton-components.jsx

// Skeleton component for individual cells
export const SkeletonCell = ({ width = "100%", height = "16px" }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: "#f0f0f0",
      borderRadius: "4px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
        animation: "shimmer 1.5s infinite",
      }}
    />
    <style>{`
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `}</style>
  </div>
)

// Skeleton row component
export const SkeletonRow = ({ columns }) => (
  <tr style={{ backgroundColor: "white", borderBottom: "1px solid #E0E0E0" }}>
    {columns.map((column, colIndex) => (
      <td
        key={colIndex}
        style={{
          padding: "26px 20px",
          textAlign: colIndex === 0 ? "left" : "center",
        }}
      >
        <SkeletonCell width={colIndex === 0 ? "80%" : "60%"} height={colIndex === 0 ? "20px" : "16px"} />
      </td>
    ))}
  </tr>
)

// Multiple skeleton rows
export const SkeletonTable = ({ columns, rowCount = 8 }) => (
  <>
    {Array.from({ length: rowCount }, (_, index) => (
      <SkeletonRow key={index} columns={columns} />
    ))}
  </>
)