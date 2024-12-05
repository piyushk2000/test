import React from 'react'
import "./style.scss"
import PageLayout from "../../atoms/page-layout";
import AppBarCommon from "../../molecules/app-bar-common";
import Box from "@mui/material/Box";
type Props = {}

export default function Tags({}: Props) {
  return (
    <PageLayout>
    <Box sx={{ pb: "24px" }}>
      <AppBarCommon
        title="Tag"
        isUserIcon
        isSearch={false}
        isIconDefine={false}
      />
    </Box>
  <div id="structure">
    <div id="main">
      <div id="main-content">
        <div id="main-content-divs" style={{ marginTop: 10 }}>
          <div
            className="main-content-alpha-wise"
            style={{ marginTop: 0 }}
            id="A"
          >
            <div className="main-content-alpha-wise-head">Term A Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abend</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abstraction</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access Point</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Accessibility</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACID</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACL</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Activation Key</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active Cell</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ActiveDirectory</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active-Matrix</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abend</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abstraction</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access Point</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Accessibility</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACID</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACL</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Activation Key</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active Cell</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ActiveDirectory</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active-Matrix</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abend</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abstraction</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access Point</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Accessibility</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACID</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACL</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Activation Key</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active Cell</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ActiveDirectory</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active-Matrix</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abend</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abstraction</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access Point</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Accessibility</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACID</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACL</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Activation Key</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active Cell</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ActiveDirectory</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active-Matrix</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abend</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Abstraction</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Access Point</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Accessibility</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACID</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ACL</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Activation Key</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active Cell</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>ActiveDirectory</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Active-Matrix</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="B">
            <div className="main-content-alpha-wise-head">Term B Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backbone</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backdoor</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backend</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backlink</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backside Bus</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backup</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bandwidth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Banner Ad</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>BarCraft</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bare Metal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Barebones</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backbone</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backdoor</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backend</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backlink</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backside Bus</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backup</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bandwidth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Banner Ad</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>BarCraft</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bare Metal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Barebones</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backbone</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backdoor</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backend</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backlink</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backside Bus</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backup</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bandwidth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Banner Ad</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>BarCraft</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bare Metal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Barebones</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backbone</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backdoor</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backend</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backlink</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backside Bus</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backup</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bandwidth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Banner Ad</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>BarCraft</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bare Metal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Barebones</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backbone</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backdoor</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backend</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backlink</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backside Bus</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Backup</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bandwidth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Banner Ad</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>BarCraft</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Bare Metal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Barebones</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="C">
            <div className="main-content-alpha-wise-head">Term C Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Cat</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chore</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Choir</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chamber</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charity</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Clove</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Convent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Concern</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Caricature</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Courage</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Cat</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chore</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Choir</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chamber</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charity</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Clove</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Convent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Concern</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Caricature</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Courage</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Cat</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chore</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Choir</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chamber</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charity</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Clove</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Convent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Concern</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Caricature</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Courage</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Cat</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chore</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Choir</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chamber</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charity</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Clove</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Convent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Concern</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Caricature</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Courage</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Cat</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chore</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Choir</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Chamber</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Charity</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Clove</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Convent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Concern</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Caricature</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Courage</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="D">
            <div className="main-content-alpha-wise-head">Term D Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Damage</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deviation</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discovery</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discussion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deterioration</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Department</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Development</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deprive</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Diminish</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Disintegrate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Dissimilate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Damage</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deviation</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discovery</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discussion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deterioration</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Department</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Development</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deprive</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Diminish</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Disintegrate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Dissimilate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Damage</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deviation</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discovery</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discussion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deterioration</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Department</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Development</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deprive</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Diminish</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Disintegrate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Dissimilate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Damage</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deviation</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discovery</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discussion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deterioration</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Department</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Development</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deprive</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Diminish</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Disintegrate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Dissimilate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Damage</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deviation</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discovery</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Discussion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deterioration</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Department</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Development</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Deprive</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Diminish</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Disintegrate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Dissimilate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="E">
            <div className="main-content-alpha-wise-head">Term E Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Equate</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Embody</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Entitle</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Emanate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Extinguish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exclaim</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Educate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endorse</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exhaust</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endurance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Education</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Equate</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Embody</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Entitle</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Emanate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Extinguish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exclaim</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Educate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endorse</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exhaust</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endurance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Education</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Equate</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Embody</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Entitle</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Emanate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Extinguish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exclaim</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Educate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endorse</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exhaust</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endurance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Education</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Equate</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Embody</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Entitle</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Emanate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Extinguish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exclaim</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Educate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endorse</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exhaust</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endurance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Education</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Equate</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Embody</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Entitle</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Emanate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Extinguish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exclaim</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Educate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endorse</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Exhaust</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Endurance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Education</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="F">
            <div className="main-content-alpha-wise-head">Term F Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fence</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Floss</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Force</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Friend</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Future</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Flight</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fashion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Failure</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fluster</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Freshen</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fabricate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fence</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Floss</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Force</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Friend</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Future</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Flight</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fashion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Failure</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fluster</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Freshen</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fabricate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fence</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Floss</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Force</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Friend</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Future</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Flight</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fashion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Failure</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fluster</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Freshen</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fabricate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fence</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Floss</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Force</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Friend</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Future</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Flight</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fashion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Failure</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fluster</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Freshen</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fabricate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fence</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Floss</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Force</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Friend</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Future</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Flight</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fashion</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Failure</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fluster</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Freshen</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Fabricate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="G">
            <div className="main-content-alpha-wise-head">Term G Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grass</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Groom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Game</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Glory</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Goods</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Growth</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guardian</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guard</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gallop</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gobble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grievous</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grass</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Groom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Game</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Glory</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Goods</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Growth</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guardian</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guard</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gallop</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gobble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grievous</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grass</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Groom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Game</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Glory</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Goods</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Growth</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guardian</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guard</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gallop</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gobble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grievous</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grass</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Groom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Game</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Glory</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Goods</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Growth</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guardian</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guard</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gallop</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gobble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grievous</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grass</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Groom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Game</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Glory</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Goods</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Growth</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guardian</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Guard</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gallop</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Gobble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Grievous</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="H">
            <div className="main-content-alpha-wise-head">Term H Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Habit</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Health</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Horse</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunch</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunger</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hassle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>History</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Harvest</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hesitate</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hasten</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hilarious</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Habit</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Health</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Horse</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunch</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunger</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hassle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>History</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Harvest</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hesitate</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hasten</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hilarious</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Habit</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Health</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Horse</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunch</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunger</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hassle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>History</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Harvest</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hesitate</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hasten</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hilarious</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Habit</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Health</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Horse</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunch</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunger</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hassle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>History</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Harvest</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hesitate</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hasten</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hilarious</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Habit</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Health</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Horse</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunch</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hunger</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hassle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>History</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Harvest</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hesitate</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hasten</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Hilarious</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="I">
            <div className="main-content-alpha-wise-head">Term I Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Iguana</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Impala</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Insect</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inkpot</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccuracy</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvement</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvisation</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Injection</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inactivity</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccurate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Immaculate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Iguana</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Impala</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Insect</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inkpot</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccuracy</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvement</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvisation</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Injection</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inactivity</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccurate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Immaculate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Iguana</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Impala</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Insect</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inkpot</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccuracy</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvement</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvisation</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Injection</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inactivity</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccurate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Immaculate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Iguana</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Impala</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Insect</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inkpot</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccuracy</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvement</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvisation</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Injection</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inactivity</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccurate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Immaculate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Iguana</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Impala</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Insect</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inkpot</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccuracy</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvement</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Improvisation</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Injection</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inactivity</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Inaccurate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Immaculate</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="J">
            <div className="main-content-alpha-wise-head">Term J Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jabber</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jargon</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jaunt</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jolly</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jovial</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Judicious</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juncture</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jurisdiction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juxtapose</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Junk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Joker</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jabber</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jargon</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jaunt</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jolly</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jovial</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Judicious</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juncture</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jurisdiction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juxtapose</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Junk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Joker</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jabber</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jargon</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jaunt</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jolly</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jovial</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Judicious</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juncture</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jurisdiction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juxtapose</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Junk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Joker</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jabber</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jargon</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jaunt</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jolly</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jovial</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Judicious</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juncture</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jurisdiction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juxtapose</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Junk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Joker</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jabber</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jargon</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jaunt</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jolly</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jovial</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Judicious</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juncture</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Jurisdiction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Juxtapose</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Junk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Joker</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="K">
            <div className="main-content-alpha-wise-head">Term K Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kayak</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kiosk</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knife</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Keypad</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kerchief</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kangaroo</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kindness</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kingdom</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knuckle</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knabble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knock</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kayak</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kiosk</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knife</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Keypad</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kerchief</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kangaroo</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kindness</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kingdom</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knuckle</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knabble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knock</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kayak</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kiosk</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knife</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Keypad</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kerchief</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kangaroo</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kindness</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kingdom</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knuckle</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knabble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knock</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kayak</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kiosk</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knife</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Keypad</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kerchief</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kangaroo</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kindness</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kingdom</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knuckle</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knabble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knock</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kayak</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kiosk</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knife</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Keypad</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kerchief</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kangaroo</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kindness</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Kingdom</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knuckle</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knabble</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Knock</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="L">
            <div className="main-content-alpha-wise-head">Term L Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Labyrinth</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lacuna</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lampoon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languid</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Leverage</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Luminary</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lunatic</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Land</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Look</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lovely</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Labyrinth</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lacuna</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lampoon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languid</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Leverage</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Luminary</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lunatic</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Land</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Look</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lovely</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Labyrinth</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lacuna</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lampoon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languid</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Leverage</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Luminary</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lunatic</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Land</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Look</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lovely</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Labyrinth</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lacuna</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lampoon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languid</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Leverage</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Luminary</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lunatic</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Land</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Look</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lovely</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Labyrinth</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lacuna</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lampoon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languid</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Languish</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Leverage</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Luminary</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lunatic</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Land</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Look</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Lovely</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="M">
            <div className="main-content-alpha-wise-head">Term M Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Macrocosm</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Magnanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Malapropism</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mandarin</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manifestation</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manoeuvre</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mediocre</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Merchandise</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mundane</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mango</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Map</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Macrocosm</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Magnanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Malapropism</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mandarin</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manifestation</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manoeuvre</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mediocre</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Merchandise</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mundane</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mango</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Map</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Macrocosm</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Magnanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Malapropism</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mandarin</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manifestation</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manoeuvre</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mediocre</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Merchandise</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mundane</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mango</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Map</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Macrocosm</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Magnanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Malapropism</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mandarin</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manifestation</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manoeuvre</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mediocre</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Merchandise</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mundane</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mango</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Map</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Macrocosm</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Magnanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Malapropism</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mandarin</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manifestation</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Manoeuvre</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mediocre</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Merchandise</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mundane</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Mango</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Map</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="N">
            <div className="main-content-alpha-wise-head">Term N Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Narcissist</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nemesis</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Neophyte</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nepotism</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Niche</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nirvana</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nullify</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nocturnal</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nomenclature</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Night</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>National</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Narcissist</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nemesis</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Neophyte</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nepotism</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Niche</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nirvana</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nullify</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nocturnal</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nomenclature</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Night</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>National</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Narcissist</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nemesis</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Neophyte</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nepotism</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Niche</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nirvana</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nullify</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nocturnal</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nomenclature</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Night</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>National</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Narcissist</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nemesis</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Neophyte</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nepotism</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Niche</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nirvana</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nullify</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nocturnal</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nomenclature</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Night</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>National</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Narcissist</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nemesis</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Neophyte</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nepotism</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Niche</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nirvana</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nullify</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nocturnal</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Nomenclature</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Night</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>National</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="O">
            <div className="main-content-alpha-wise-head">Term O Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivion</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivious</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obscure</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obsolete</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Odour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omen</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipotent</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipresent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omniscient</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overwhelm</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overflow</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivion</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivious</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obscure</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obsolete</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Odour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omen</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipotent</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipresent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omniscient</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overwhelm</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overflow</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivion</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivious</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obscure</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obsolete</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Odour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omen</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipotent</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipresent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omniscient</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overwhelm</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overflow</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivion</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivious</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obscure</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obsolete</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Odour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omen</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipotent</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipresent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omniscient</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overwhelm</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overflow</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivion</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Oblivious</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obscure</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Obsolete</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Odour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omen</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipotent</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omnipresent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Omniscient</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overwhelm</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Overflow</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="P">
            <div className="main-content-alpha-wise-head">Term P Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pandemonium</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paramount</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paranoia</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Perplex</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Petrify</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pinnacle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Preamble</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Protocol</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pseudonym</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Package</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Palms</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pandemonium</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paramount</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paranoia</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Perplex</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Petrify</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pinnacle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Preamble</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Protocol</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pseudonym</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Package</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Palms</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pandemonium</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paramount</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paranoia</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Perplex</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Petrify</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pinnacle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Preamble</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Protocol</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pseudonym</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Package</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Palms</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pandemonium</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paramount</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paranoia</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Perplex</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Petrify</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pinnacle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Preamble</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Protocol</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pseudonym</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Package</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Palms</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pandemonium</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paramount</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Paranoia</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Perplex</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Petrify</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pinnacle</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Preamble</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Protocol</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Pseudonym</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Package</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Palms</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="Q">
            <div className="main-content-alpha-wise-head">Term Q Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="R">
            <div className="main-content-alpha-wise-head">Term R Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Rampant</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Realm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Rebuke</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Reconnaissance</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Reiterate</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Rejuvenate</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Relegate</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Reminiscent</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Remorse</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Renaissance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Roman</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quadrilateral</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Qualitative</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quandary</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantitative</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quantum</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quarantine</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quench</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Querulous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quibble</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Quintessence</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Queen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="S">
            <div className="main-content-alpha-wise-head">Term S Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sagacious</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sarcasm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Satire</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scornful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scrutinise</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Semantics</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Seminal</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Serendipity</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Solace</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sachin</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Status</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sagacious</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sarcasm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Satire</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scornful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scrutinise</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Semantics</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Seminal</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Serendipity</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Solace</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sachin</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Status</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sagacious</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sarcasm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Satire</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scornful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scrutinise</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Semantics</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Seminal</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Serendipity</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Solace</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sachin</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Status</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sagacious</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sarcasm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Satire</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scornful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scrutinise</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Semantics</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Seminal</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Serendipity</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Solace</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sachin</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Status</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sagacious</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sarcasm</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Satire</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scornful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Scrutinise</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Semantics</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Seminal</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Serendipity</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Solace</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Sachin</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Status</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="T">
            <div className="main-content-alpha-wise-head">Term T Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taboo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactful</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactical</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tangible</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tantamount</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taunt</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenet</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenuous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Termination</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Threshold</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Table</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taboo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactful</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactical</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tangible</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tantamount</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taunt</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenet</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenuous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Termination</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Threshold</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Table</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taboo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactful</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactical</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tangible</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tantamount</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taunt</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenet</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenuous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Termination</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Threshold</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Table</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taboo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactful</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactical</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tangible</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tantamount</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taunt</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenet</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenuous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Termination</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Threshold</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Table</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taboo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactful</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tactical</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tangible</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tantamount</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Taunt</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenet</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Tenuous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Termination</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Threshold</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Table</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="U">
            <div className="main-content-alpha-wise-head">Term U Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Ubiquitous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unbiased</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Undaunted</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unilateral</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unravel</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Upheaval</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utility</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utopian</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utterance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unlimited</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Ubiquitous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unbiased</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Undaunted</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unilateral</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unravel</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Upheaval</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utility</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utopian</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utterance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unlimited</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Ubiquitous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unbiased</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Undaunted</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unilateral</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unravel</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Upheaval</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utility</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utopian</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utterance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unlimited</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Ubiquitous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unbiased</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Undaunted</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unilateral</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unravel</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Upheaval</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utility</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utopian</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utterance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unlimited</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Ubiquitous</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unanimous</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unbiased</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Undaunted</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unilateral</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unravel</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Upheaval</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utility</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utopian</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Utterance</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Unlimited</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="V">
            <div className="main-content-alpha-wise-head">Term V Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valediction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valiant</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vengeance</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vernacular</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versatile</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versification</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vertigo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigilante</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigorous</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Viper</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valediction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valiant</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vengeance</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vernacular</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versatile</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versification</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vertigo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigilante</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigorous</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Viper</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valediction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valiant</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vengeance</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vernacular</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versatile</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versification</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vertigo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigilante</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigorous</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Viper</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valediction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valiant</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vengeance</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vernacular</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versatile</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versification</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vertigo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigilante</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigorous</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Viper</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valediction</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valiant</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Valour</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vengeance</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vernacular</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versatile</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Versification</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vertigo</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigilante</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Vigorous</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Viper</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="W">
            <div className="main-content-alpha-wise-head">Term W Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wanderlust</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wardrobe</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wayfarer</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Whimsical</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Winsome</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wither</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wizard</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrangle</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrath</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wretched</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Watch</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wanderlust</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wardrobe</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wayfarer</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Whimsical</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Winsome</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wither</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wizard</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrangle</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrath</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wretched</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Watch</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wanderlust</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wardrobe</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wayfarer</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Whimsical</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Winsome</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wither</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wizard</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrangle</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrath</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wretched</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Watch</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wanderlust</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wardrobe</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wayfarer</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Whimsical</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Winsome</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wither</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wizard</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrangle</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrath</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wretched</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Watch</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wanderlust</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wardrobe</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wayfarer</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Whimsical</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Winsome</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wither</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wizard</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrangle</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wrath</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Wretched</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Watch</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="X">
            <div className="main-content-alpha-wise-head">Term X Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenophobia</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xerox</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylography</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xeric</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylem</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xebec</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xiphoid</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xanthic</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylocarp</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylograph</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenophobia</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xerox</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylography</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xeric</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylem</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xebec</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xiphoid</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xanthic</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylocarp</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylograph</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenophobia</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xerox</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylography</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xeric</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylem</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xebec</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xiphoid</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xanthic</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylocarp</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylograph</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenophobia</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xerox</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylography</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xeric</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylem</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xebec</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xiphoid</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xanthic</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylocarp</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylograph</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenophobia</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xerox</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylography</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xeric</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xenon</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylem</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xebec</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xiphoid</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xanthic</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylocarp</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Xylograph</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="Y">
            <div className="main-content-alpha-wise-head">Term Y Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yacht</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yarn</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yolk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youngster</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yellowish</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yearlong</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesteryear</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesterday</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yield</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>York</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yacht</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yarn</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yolk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youngster</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yellowish</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yearlong</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesteryear</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesterday</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yield</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>York</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yacht</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yarn</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yolk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youngster</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yellowish</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yearlong</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesteryear</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesterday</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yield</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>York</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yacht</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yarn</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yolk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youngster</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yellowish</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yearlong</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesteryear</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesterday</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yield</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>York</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yacht</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yarn</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yolk</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youth</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Youngster</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yellowish</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yearlong</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesteryear</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yesterday</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Yield</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>York</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-alpha-wise" id="Z">
            <div className="main-content-alpha-wise-head">Term Z Functions</div>
            <div className="main-content-alpha-wise-content">
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zoom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zebra</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zappy</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zonal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zillion</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zestful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zigzag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zucchini</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zone</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zoom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zebra</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zappy</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zonal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zillion</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zestful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zigzag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zucchini</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zone</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zoom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zebra</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zappy</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zonal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zillion</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zestful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zigzag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zucchini</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zone</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div className="main-content-alpha-wise-item-tail">
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zoom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zebra</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zappy</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zonal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zillion</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zestful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zigzag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zucchini</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zone</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
              <div className="main-content-alpha-wise-item">
                <div className="main-content-alpha-wise-item-head">
                  <div className="words-count">
                    <p>Words</p>
                    <p>Count</p>
                  </div>
                </div>
                <div
                  className="main-content-alpha-wise-item-tail"
                  style={{ border: "none" }}
                >
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zoom</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zebra</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zappy</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zonal</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zillion</p>
                    <div className="xyz">83</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zestful</p>
                    <div className="xyz">63</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zigzag</p>
                    <div className="xyz">90</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zucchini</p>
                    <div className="xyz">47</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zone</p>
                    <div className="xyz">53</div>
                  </div>
                  <div className="main-content-alpha-wise-item-tail-item">
                    <p>Zen</p>
                    <div className="xyz">63</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="main-content-alphabets">
          <a href="#A">
            <div className="main-content-alphabets-item imp">A (120)</div>
          </a>
          <a href="#B">
            <div className="main-content-alphabets-item">B (160)</div>
          </a>
          <a href="#C">
            <div className="main-content-alphabets-item">C (55)</div>
          </a>
          <a href="#D">
            <div className="main-content-alphabets-item">D (210)</div>
          </a>
          <a href="#E">
            <div className="main-content-alphabets-item">E (120)</div>
          </a>
          <a href="#F">
            <div className="main-content-alphabets-item">F (160)</div>
          </a>
          <a href="#G">
            <div className="main-content-alphabets-item">G (55)</div>
          </a>
          <a href="#H">
            <div className="main-content-alphabets-item">H (210)</div>
          </a>
          <a href="#I">
            <div className="main-content-alphabets-item">I (120)</div>
          </a>
          <a href="#J">
            <div className="main-content-alphabets-item">J (160)</div>
          </a>
          <a href="#K">
            <div className="main-content-alphabets-item">K (55)</div>
          </a>
          <a href="#L">
            <div className="main-content-alphabets-item">L (210)</div>
          </a>
          <a href="#M">
            <div className="main-content-alphabets-item">M (120)</div>
          </a>
          <a href="#N">
            <div className="main-content-alphabets-item">N (160)</div>
          </a>
          <a href="#O">
            <div className="main-content-alphabets-item">O (55)</div>
          </a>
          <a href="#P">
            <div className="main-content-alphabets-item">P (210)</div>
          </a>
          <a href="#Q">
            <div className="main-content-alphabets-item">Q (120)</div>
          </a>
          <a href="#R">
            <div className="main-content-alphabets-item">R (160)</div>
          </a>
          <a href="#S">
            <div className="main-content-alphabets-item">S (55)</div>
          </a>
          <a href="#T">
            <div className="main-content-alphabets-item">T (210)</div>
          </a>
          <a href="#U">
            <div className="main-content-alphabets-item">U (120)</div>
          </a>
          <a href="#V">
            <div className="main-content-alphabets-item">V (169)</div>
          </a>
          <a href="#W">
            <div className="main-content-alphabets-item">W (55)</div>
          </a>
          <a href="#X">
            <div className="main-content-alphabets-item">X (210)</div>
          </a>
          <a href="#Y">
            <div className="main-content-alphabets-item">Y (120)</div>
          </a>
          <a href="#Z">
            <div className="main-content-alphabets-item">Z (160)</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</PageLayout>

  )
}