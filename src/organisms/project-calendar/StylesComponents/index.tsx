import styled from "@emotion/styled";

export const CalendarContainer = styled.div`
  .fc-button-active {
    background-color: #ec9324 !important;
    border: 1px solid rgba(236, 147, 36, 0.5) !important;
    color: white;
  }
  .fc-button {
    background-color: transparent;
    color: #ec9324;
    border: 1px solid rgba(236, 147, 36, 0.5);
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover,
    &:focus,
    &:active {
      background-color: rgba(236, 147, 36, 0.04);
      border: 1px solid #ec9324;
      color: #ec9324;
    }
    &:focus,
    &:active {
      background-color: #ec9324 !important;
      border: 1px solid rgba(236, 147, 36, 0.5) !important;
      color: white !important;
    }
    &:disabled {
      background-color: rgba(236, 147, 36, 0.5);
      border: none;
      opacity: 1;
      &:hover {
        color: white !important;
      }
    }
    box-shadow: none !important;

    text-transform: capitalize;
  }

  @media (max-width: 600px) {
    .fc .fc-toolbar-title {
      font-size: 1.25em;
    }

    .fc .fc-button-group {
      font-size: 0.75rem;
    }
  }
  .fc-custom1-button {
    border: none;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.54);

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      color: rgba(0, 0, 0, 0.87);
      border: none !important;
    }
  }

  .fc-myCustomButton-button {
    border: none;
    background: none;
    color: inherit;
    text-decoration: none;
    cursor: default;
  }

  .fc-myCustomButton-button:hover,
  .fc-myCustomButton-button:active,
  .fc-myCustomButton-button:focus {
    border: none !important;
    background: none !important;
    color: inherit !important;
    text-decoration: none !important;
    outline: none !important;
    cursor: default;
  }
`;

export const MobileInfo = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2f498e;
    z-index: 100;
    color: white;
    padding: 4px 10px;
    text-align: center;
  }
`;
