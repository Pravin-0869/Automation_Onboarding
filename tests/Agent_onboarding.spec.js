const { test, expect } = require('@playwright/test');


    // =====================================================
    // UNIQUE AGENT TEST DATA
    // =====================================================

    function generateAgentData() {

        const timestamp = Date.now();

        return {
            name: `Test Agent ${timestamp}`,
            mobile: `9${String(timestamp).slice(-9)}`,
            email: `testagent${timestamp}@gmail.com`
        };
    }


    // =====================================================
    // UNIQUE CKYC NUMBER
    // =====================================================

    function generateCKYCNumber() {

        // Generate unique 14-digit CKYC number
        const timestampPart =
            String(Date.now()).slice(-12);

        const randomPart =
            String(
                Math.floor(Math.random() * 100)
            ).padStart(2, "0");

        return timestampPart + randomPart;
    }


    // =====================================================
    // ONBOARDING TEST CLASS
    // =====================================================

    class OnboardingTest {

        constructor(page) {

            this.page = page;
            this.agent = null;
        }


        // =====================================================
        // COMMON OTP
        // =====================================================

        async enterOTP(otp) {

            if (otp.length !== 6) {

                throw new Error(
                    "OTP must contain exactly 6 digits"
                );
            }

            console.log("Entering OTP...");

            for (let i = 0; i < 6; i++) {

                const otpField =
                    this.page.locator(
                        `[name='otp_code[${i}]']`
                    );

                await otpField.waitFor({
                    state: "visible",
                    timeout: 15000
                });

                await otpField.click();

                await otpField.fill("");

                await otpField.pressSequentially(
                    otp[i],
                    {
                        delay: 100
                    }
                );

                console.log(
                    `OTP ${i + 1} entered`
                );
            }

            console.log(
                "OTP 123456 entered successfully"
            );
        }


        // =====================================================
        // FLS LOGIN
        // =====================================================

        async flsLogin() {

            console.log("===== FLS LOGIN =====");

            await this.page.goto(
                "https://uat-phidashboard.fynity.in/onboarding/login",
                {
                    waitUntil: "domcontentloaded"
                }
            );

            const mobile =
                this.page.locator(
                    "[name='mobile']"
                );

            await mobile.waitFor({
                state: "visible",
                timeout: 15000
            });

            await mobile.fill(
                "7777777777"
            );

            const loginButton =
                this.page.locator(
                    "button[type='submit']"
                );

            await expect(
                loginButton
            ).toBeEnabled({
                timeout: 15000
            });

            await loginButton.click();

            console.log(
                "FLS Login completed"
            );
        }


        // =====================================================
        // FLS OTP
        // =====================================================

        async flsOTP() {

            console.log("===== FLS OTP =====");

            await this.enterOTP(
                "123456"
            );

            const signInButton =
                this.page.locator(
                    "button[type='submit']"
                );

            await expect(
                signInButton
            ).toBeEnabled({
                timeout: 15000
            });

            console.log(
                "FLS Sign In enabled"
            );

            await signInButton.click();

            console.log(
                "FLS OTP completed"
            );
        }


        // =====================================================
        // AGENT MASTER
        // =====================================================

        async openAgentMaster() {

            console.log(
                "===== AGENT MASTER ====="
            );

            const onboardButton =
                this.page.getByText(
                    "Onboard Agent",
                    {
                        exact: true
                    }
                );

            await onboardButton.waitFor({
                state: "visible",
                timeout: 15000
            });

            await onboardButton.click();

            console.log(
                "Onboard Agent clicked"
            );
        }


        // =====================================================
        // CREATE AGENT
        // =====================================================

        async createAgent() {

            console.log(
                "===== CREATE AGENT ====="
            );

            this.agent =
                generateAgentData();

            console.log(
                "=============================="
            );

            console.log(
                "NEW AGENT DATA"
            );

            console.log(
                "=============================="
            );

            console.log(
                "Name   :",
                this.agent.name
            );

            console.log(
                "Mobile :",
                this.agent.mobile
            );

            console.log(
                "Email  :",
                this.agent.email
            );

            console.log(
                "=============================="
            );


            // -------------------------------------------------
            // FULL NAME
            // -------------------------------------------------

            const fullName =
                this.page.locator(
                    "[placeholder='Enter your full name']"
                );

            await fullName.waitFor({
                state: "visible",
                timeout: 15000
            });

            await fullName.fill(
                this.agent.name
            );


            // -------------------------------------------------
            // MOBILE
            // -------------------------------------------------

            const mobileNumber =
                this.page.locator(
                    "[placeholder='Enter your mobile number']"
                );

            await mobileNumber.waitFor({
                state: "visible",
                timeout: 15000
            });

            await mobileNumber.fill(
                this.agent.mobile
            );


            // -------------------------------------------------
            // EMAIL
            // -------------------------------------------------

            const email =
                this.page.locator(
                    "[placeholder='Enter your email']"
                );

            await email.waitFor({
                state: "visible",
                timeout: 15000
            });

            await email.fill(
                this.agent.email
            );

            console.log(
                "Unique agent details entered"
            );


            // -------------------------------------------------
            // SUBMIT
            // -------------------------------------------------

            const submitButton =
                this.page.getByRole(
                    "button",
                    {
                        name: "Submit",
                        exact: true
                    }
                );

            await submitButton.waitFor({
                state: "visible",
                timeout: 10000
            });

            await expect(
                submitButton
            ).toBeEnabled({
                timeout: 10000
            });

            console.log(
                "Submit button enabled"
            );

            await submitButton.click();

            console.log(
                "Create Agent Submit clicked"
            );


            // -------------------------------------------------
            // WAIT FOR AGENT OTP SCREEN
            // -------------------------------------------------

            const otpField =
                this.page.locator(
                    "[name='otp_code[0]']"
                );

            console.log(
                "Waiting for Agent OTP screen..."
            );

            await otpField.waitFor({
                state: "visible",
                timeout: 15000
            });

            console.log(
                "Agent OTP screen displayed"
            );
        }


        // =====================================================
        // AGENT OTP
        // =====================================================

        async agentOTP() {

            console.log(
                "===== AGENT OTP ====="
            );

            const firstOTPField =
                this.page.locator(
                    "[name='otp_code[0]']"
                );

            await firstOTPField.waitFor({
                state: "visible",
                timeout: 15000
            });

            console.log(
                "Agent OTP screen displayed"
            );


            // -------------------------------------------------
            // ENTER OTP
            // -------------------------------------------------

            await this.enterOTP(
                "123456"
            );

            console.log(
                "Agent OTP entered"
            );


            // -------------------------------------------------
            // VERIFY OTP
            // -------------------------------------------------

            const verifyButton =
                this.page.getByRole(
                    "button",
                    {
                        name: "Verify OTP",
                        exact: true
                    }
                );

            await verifyButton.waitFor({
                state: "visible",
                timeout: 15000
            });

            console.log(
                "Verify OTP button displayed"
            );

            await expect(
                verifyButton
            ).toBeEnabled({
                timeout: 15000
            });

            console.log(
                "Verify OTP button ENABLED"
            );


            // -------------------------------------------------
            // CLICK VERIFY OTP
            // -------------------------------------------------

            await verifyButton.click();

            console.log(
                "Verify OTP clicked"
            );


            // -------------------------------------------------
            // WAIT FOR AGENT MASTER
            // -------------------------------------------------

            await this.page.waitForTimeout(
                1500
            );

            console.log(
                "Agent OTP verification completed"
            );
        }


        // =====================================================
        // OPEN CREATED AGENT
        // SEARCH + EYE ICON
        // =====================================================

        async openCreatedAgent() {

            console.log(
                "===== OPEN CREATED AGENT ====="
            );

            const agentEmail =
                this.agent.email;

            console.log(
                "Searching for created agent:",
                agentEmail
            );


            // -------------------------------------------------
            // FIND SEARCH TABLE
            // -------------------------------------------------

            const searchTable =
                this.page.getByRole(
                    "textbox",
                    {
                        name: "Search Table"
                    }
                );

            await searchTable.waitFor({
                state: "visible",
                timeout: 15000
            });

            console.log(
                "Search Table found"
            );


            // -------------------------------------------------
            // SEARCH CREATED AGENT
            // -------------------------------------------------

            await searchTable.fill(
                agentEmail
            );

            console.log(
                "Searching email:",
                agentEmail
            );


            // -------------------------------------------------
            // WAIT FOR CREATED AGENT ROW
            // -------------------------------------------------

            const agentRow =
                this.page.locator(
                    "tr"
                ).filter({
                    hasText: agentEmail
                }).first();

            await expect(
                agentRow
            ).toBeVisible({
                timeout: 30000
            });

            console.log(
                "Created agent row found"
            );


            // -------------------------------------------------
            // FIND ACTION CELL
            // -------------------------------------------------

            const actionCell =
                agentRow.locator(
                    "td"
                ).last();

            await actionCell.waitFor({
                state: "visible",
                timeout: 10000
            });

            console.log(
                "Action cell found"
            );


            // -------------------------------------------------
            // FIND EYE ICON
            // -------------------------------------------------

            const eyeIcon =
                actionCell.locator(
                    "[class*='cursor-pointer'], svg"
                ).last();

            await eyeIcon.waitFor({
                state: "visible",
                timeout: 10000
            });

            console.log(
                "Eye icon found"
            );


            // -------------------------------------------------
            // CLICK EYE ICON
            // -------------------------------------------------

            await eyeIcon.click();

            console.log(
                "Eye icon clicked"
            );


            // -------------------------------------------------
            // WAIT FOR NEXT SCREEN
            // -------------------------------------------------

            await this.page.waitForTimeout(
                1500
            );

            console.log(
                "Created agent opened"
            );
        }


       // =====================================================
// AGENT TYPE
// =====================================================

async selectAgentType(type) {

    console.log("=================================");
    console.log(`SELECTING AGENT TYPE: ${type}`);
    console.log("=================================");

    // -------------------------------------------------
    // FIND AGENT TYPE COMBOBOX
    // -------------------------------------------------

    const agentTypeInput =
        this.page.locator(
            "input[role='combobox'][placeholder='Enter Agent Type']"
        );

    await agentTypeInput.waitFor({
        state: "visible",
        timeout: 15000
    });

    console.log(
        "Agent Type dropdown found"
    );


    // -------------------------------------------------
    // OPEN DROPDOWN
    // -------------------------------------------------

    await agentTypeInput.click();

    console.log(
        "Agent Type dropdown opened"
    );


    // -------------------------------------------------
    // SELECT AGENT TYPE
    // -------------------------------------------------

    const agentTypeDropdown =
        this.page.getByLabel(
            "Select Agent Type"
        );

    const option =
        agentTypeDropdown.getByText(
            type,
            {
                exact: true
            }
        );

    await option.waitFor({
        state: "visible",
        timeout: 10000
    });

    console.log(
        `Agent Type option found: ${type}`
    );

    await option.click();

    console.log(
        `${type} selected`
    );


    // -------------------------------------------------
    // WAIT AFTER SELECTION
    // -------------------------------------------------

    await this.page.waitForTimeout(
        1000
    );


    // -------------------------------------------------
    // FIND SUBMIT BUTTON
    // -------------------------------------------------

    const submitButtons =
        this.page.locator(
            "button[type='submit']"
        );

    const submitButton =
        submitButtons.last();

    await submitButton.waitFor({
        state: "visible",
        timeout: 15000
    });

    console.log(
        "Agent Type Submit button found"
    );


    // -------------------------------------------------
    // WAIT UNTIL ENABLED
    // -------------------------------------------------

    await expect(
        submitButton
    ).toBeEnabled({
        timeout: 15000
    });

    console.log(
        "Agent Type Submit button ENABLED"
    );


    // -------------------------------------------------
    // CLICK SUBMIT
    // -------------------------------------------------

    await submitButton.click();

    console.log(
        `${type} Submit clicked`
    );


    // -------------------------------------------------
    // DO NOT WAIT FOR CKYC HERE
    // -------------------------------------------------

    await this.page.waitForTimeout(
        2000
    );

    console.log(
        "Agent Type selection completed"
    );

    console.log(
        "Current URL:",
        this.page.url()
    );
}

// =====================================================
// PROFILE DETAILS
// =====================================================

async profileDetails() {

    console.log(
        "===== PROFILE DETAILS ====="
    );


    // -------------------------------------------------
    // CKYC
    // -------------------------------------------------

    await this.ckycDetails();


    // -------------------------------------------------
    // SALUTATION
    // -------------------------------------------------

    console.log("Selecting Salutation...");

    const salutation = this.page.getByText(
        "Select Salutation",
        {
            exact: true
        }
    );

    await salutation.waitFor({
        state: "visible",
        timeout: 15000
    });

    await salutation.click();

    console.log("Salutation dropdown opened");


    // -------------------------------------------------
    // SELECT MR
    // -------------------------------------------------

    const mrOption = this.page.getByText(
        "MR",
        {
            exact: true
        }
    );

    await mrOption.waitFor({
        state: "visible",
        timeout: 10000
    });

    await mrOption.click();

    console.log("MR selected");


    // -------------------------------------------------
    // OTHER PROFILE DETAILS
    // -------------------------------------------------

    // Next profile fields will be added here.


    console.log(
        "Profile Details completed"
    );
}


async ckycDetails() {

    console.log("===== CKYC DETAILS =====");

    // -------------------------------------------------
    // WAIT FOR CKYC SCREEN
    // -------------------------------------------------

    console.log("Waiting for CKYC screen...");

    // -------------------------------------------------
    // CLICK YES
    // -------------------------------------------------

    console.log("Waiting for CKYC Yes button...");

    const ckycYes =
        this.page.getByText(
            "Yes",
            {
                exact: true
            }
        ).last();

    await ckycYes.waitFor({
        state: "visible",
        timeout: 15000
    });

    console.log("CKYC Yes button found");

    await expect(ckycYes).toBeEnabled({
        timeout: 10000
    });

    await ckycYes.click();

    console.log("CKYC Yes clicked");

    // -------------------------------------------------
    // WAIT FOR CKYC NUMBER FIELD
    // -------------------------------------------------

    const ckycInput =
        this.page.locator("[name='ckyc_number']");

    await ckycInput.waitFor({
        state: "visible",
        timeout: 15000
    });

    console.log("CKYC number field displayed");

    // -------------------------------------------------
    // GENERATE UNIQUE CKYC
    // -------------------------------------------------

    const ckycNumber = generateCKYCNumber();

    console.log(
        "CKYC Number:",
        ckycNumber
    );

    await ckycInput.fill(ckycNumber);

    console.log("Unique CKYC number entered");

    // -------------------------------------------------
    // SUBMIT
    // -------------------------------------------------

    const submitButton =
        this.page.getByRole("button", {
            name: "Submit",
            exact: true
        }).last();

    await submitButton.waitFor({
        state: "visible",
        timeout: 15000
    });

    console.log("CKYC Submit button found");

    await expect(submitButton).toBeEnabled({
        timeout: 15000
    });

    console.log("CKYC Submit button enabled");

    await submitButton.click();

    console.log("CKYC Submit clicked");

    console.log("===== CKYC COMPLETED =====");
}
        // =====================================================
        // BANK DETAILS
        // =====================================================

        async bankDetails() {

            console.log(
                "===== BANK DETAILS ====="
            );

            // Actual Bank elements not yet added.

            console.log(
                "Bank Details completed"
            );
        }


        // =====================================================
        // NOMINEE DETAILS
        // =====================================================

        async nomineeDetails() {

            console.log(
                "===== NOMINEE DETAILS ====="
            );

            // Actual Nominee elements not yet added.

            console.log(
                "Nominee Details completed"
            );
        }


        // =====================================================
        // DOCUMENTS
        // =====================================================

        async documents() {

            console.log(
                "===== DOCUMENTS ====="
            );

            // Actual Document elements not yet added.

            console.log(
                "Documents completed"
            );
        }


        // =====================================================
        // CONSENT
        // =====================================================

        async consent() {

            console.log(
                "===== CONSENT ====="
            );

            // Actual Consent elements not yet added.

            console.log(
                "Consent completed"
            );
        }


        // =====================================================
        // PAYMENT
        // =====================================================

        async payment() {

            console.log(
                "===== PAYMENT ====="
            );

            // Actual Payment elements not yet added.

            console.log(
                "Payment completed"
            );
        }


        // =====================================================
        // EXAM DETAILS
        // =====================================================

        async examDetails() {

            console.log(
                "===== EXAM DETAILS ====="
            );

            // Actual Exam Details elements not yet added.

            console.log(
                "Exam Details completed"
            );
        }


        // =====================================================
        // TRAINING
        // =====================================================

        async training() {

            console.log(
                "===== TRAINING ====="
            );

            // Actual Training elements not yet added.

            console.log(
                "Training completed"
            );
        }


        // =====================================================
        // POSP EXAM
        // =====================================================

        async pospExam() {

            console.log(
                "===== POSP EXAM ====="
            );

            // Actual POSP Exam elements not yet added.

            console.log(
                "POSP Exam completed"
            );
        }


        // =====================================================
        // THANK YOU
        // =====================================================

        async thankYou() {

            console.log(
                "===== THANK YOU ====="
            );

            // Actual Thank You elements not yet added.

            console.log(
                "Thank You completed"
            );
        }


        // =====================================================
        // CERTIFIED
        // =====================================================

        async certified() {

            console.log(
                "===== CERTIFIED ====="
            );

            // Actual Certified elements not yet added.

            console.log(
                "Agent Certified"
            );
        }


        // =====================================================
        // NEW AGENT JOURNEY
        // =====================================================

        async newAgentJourney() {

            console.log(
                "================================"
            );

            console.log(
                "NEW AGENT JOURNEY"
            );

            console.log(
                "================================"
            );


            await this.profileDetails();

            await this.bankDetails();

            await this.nomineeDetails();

            await this.documents();

            await this.consent();

            await this.payment();

            await this.examDetails();

            await this.training();

            await this.certified();


            console.log(
                "NEW AGENT JOURNEY COMPLETED"
            );
        }


        // =====================================================
        // COMPOSITE JOURNEY
        // =====================================================

        async compositeJourney() {

            console.log(
                "================================"
            );

            console.log(
                "COMPOSITE JOURNEY"
            );

            console.log(
                "================================"
            );


            await this.profileDetails();

            await this.bankDetails();

            await this.nomineeDetails();

            await this.documents();

            await this.consent();

            await this.thankYou();

            await this.certified();


            console.log(
                "COMPOSITE JOURNEY COMPLETED"
            );
        }


        // =====================================================
        // TRANSFER JOURNEY
        // =====================================================

        async transferJourney() {

            console.log(
                "================================"
            );

            console.log(
                "TRANSFER JOURNEY"
            );

            console.log(
                "================================"
            );


            await this.profileDetails();

            await this.bankDetails();

            await this.nomineeDetails();

            await this.documents();

            await this.consent();

            await this.payment();

            await this.examDetails();

            await this.training();

            await this.certified();


            console.log(
                "TRANSFER JOURNEY COMPLETED"
            );
        }


        // =====================================================
        // POSP JOURNEY
        // =====================================================

        async pospJourney() {

            console.log(
                "================================"
            );

            console.log(
                "POSP JOURNEY"
            );

            console.log(
                "================================"
            );


            await this.profileDetails();

            await this.bankDetails();

            await this.nomineeDetails();

            await this.documents();

            await this.consent();

            await this.training();

            await this.pospExam();

            await this.certified();


            console.log(
                "POSP JOURNEY COMPLETED"
            );
        }


        // =====================================================
        // RUN 3 AGENT TYPES
        //
        // 1ST = NEW AGENT
        // 2ND = POSP
        // 3RD = TRANSFER
        // =====================================================

        async runThreeAgentTypes() {

            console.log(
                "========================================"
            );

            console.log(
                "STARTING 3 AGENT ONBOARDING"
            );

            console.log(
                "========================================"
            );


            // =================================================
            // 1ST AGENT - NEW AGENT
            // =================================================

            console.log(
                "========== 1ST AGENT - NEW AGENT =========="
            );

            await this.flsLogin();

            await this.flsOTP();

            await this.openAgentMaster();

            await this.createAgent();

            await this.agentOTP();

            await this.openCreatedAgent();

            await this.selectAgentType(
                "New Agent"
            );

            await this.newAgentJourney();


            // =================================================
            // 2ND AGENT - POSP
            // =================================================

            console.log(
                "========== 2ND AGENT - POSP =========="
            );

            await this.openAgentMaster();

            await this.createAgent();

            await this.agentOTP();

            await this.openCreatedAgent();

            await this.selectAgentType(
                "POSP"
            );

            await this.pospJourney();


            // =================================================
            // 3RD AGENT - TRANSFER
            // =================================================

            console.log(
                "========== 3RD AGENT - TRANSFER =========="
            );

            await this.openAgentMaster();

            await this.createAgent();

            await this.agentOTP();

            await this.openCreatedAgent();

            await this.selectAgentType(
                "Transfer"
            );

            await this.transferJourney();


            // =================================================
            // FINISHED
            // =================================================

            console.log(
                "========================================"
            );

            console.log(
                "3 AGENTS COMPLETED SUCCESSFULLY"
            );

            console.log(
                "1st Agent : New Agent"
            );

            console.log(
                "2nd Agent : POSP"
            );

            console.log(
                "3rd Agent : Transfer"
            );

            console.log(
                "========================================"
            );
        }


        // =====================================================
        // RUN NEW AGENT
        // =====================================================

        async runNewAgent() {

            await this.flsLogin();

            await this.flsOTP();

            await this.openAgentMaster();

            await this.createAgent();

            await this.agentOTP();

            await this.openCreatedAgent();

            await this.selectAgentType(
                "New Agent"
            );

            await this.newAgentJourney();
        }


        // =====================================================
        // RUN COMPOSITE
        // =====================================================

        async runComposite() {

            await this.flsLogin();

            await this.flsOTP();

            await this.openAgentMaster();

            await this.createAgent();

            await this.agentOTP();

            await this.openCreatedAgent();

            await this.selectAgentType(
                "Composite"
            );

            await this.compositeJourney();
        }


        // =====================================================
        // RUN TRANSFER
        // =====================================================

        async runTransfer() {

            await this.flsLogin();

            await this.flsOTP();

            await this.openAgentMaster();

            await this.createAgent();

            await this.agentOTP();

            await this.openCreatedAgent();

            await this.selectAgentType(
                "Transfer"
            );

            await this.transferJourney();
        }


        // =====================================================
        // RUN POSP
        // =====================================================

        async runPOSP() {

            await this.flsLogin();

            await this.flsOTP();

            await this.openAgentMaster();

            await this.createAgent();

            await this.agentOTP();

            await this.openCreatedAgent();

            await this.selectAgentType(
                "POSP"
            );

            await this.pospJourney();
        }
    }


    // =========================================================
    // TEST
    // =========================================================

    test(
        "3 Agent Onboarding",
        async ({ page }) => {

            const onboarding =
                new OnboardingTest(page);

            await onboarding.runThreeAgentTypes();

        }
    );