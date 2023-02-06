# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Add custom id field to the Agents table

#### Acceptance Criteria: 
A new field should be added to the Agents table that allows Facilities to store their own custom id for each Agent. To maintain uniqueness, a constraint should be placed on the field to prevent duplicate custom ids for the same Agent. It should also be possible for Facilities to not provide a custom id for each Agent, so the field should be made nullable.

#### Time/Effort Estimate: 
1.5 hours. Adding a new column to a database table can be done quickly.

#### Implementation Details: 
First step would be to run an SQL query to add a new column to the Agents table named custom_id with a data type of string and a length. A unique constraint should then be added to the custom_id field to ensure that each custom id is unique for each Agent.

## Ticket 2: Modify the getShiftsByFacility function to include custom ids in Shift metadata

#### Acceptance Criteria: 
The Shift metadata returned by the getShiftsByFacility function should contain both the internal database id and custom id for each Agent assigned to a Shift. If a custom id is not provided, the function should return the internal database id for the Agent.

#### Time/Effort Estimate: 
1 hour It needs to be tested thoroughly to validate if it returns the correct information

#### Implementation Details: 
The SQL query used by the getShiftsByFacility function should be updated to retrieve the custom id for each Agent from the Agents table. If the custom id is not available for an Agent, the function should return the internal database id for that Agent.

## Ticket 3: Update the generateReport function to use custom id for Agent identification

#### Acceptance Criteria 
The reports generated by generateReport should use the custom id for each Agent instead of their internal database id. If the Facility has not provided a custom id for an Agent, the function should use the internal database id for that Agent.

#### Time/Effort Estimate: 
2 hours.  It needs to be tested thoroughly to validate if it returns the correct information

#### Implementation Details: 
The generateReport function should be updated to use the custom id for each Agent instead of the internal database id. If the custom id is not available for an Agent, the function should use the internal database id for that Agent.

## Ticket 4: Update the user interface to allow Facilities to save custom ids for Agents

#### Acceptance Criteria
The user interface should have a new form or page to allow Facilities to save custom ids for each Agent. The form should validate the custom id to ensure that it is unique for each Agent. It should also display an error message if the custom id is already in use.

#### Time/Effort Estimate: 
5 hours.  Creating a new form or page in the user interface requires designing the layout, writing and testing the code to handle user input and saving the custom ids to the database. Additionally, the form will need to include validation to ensure that the custom ids are unique and an error message is displayed if they are not

#### Implementation Details: 
A new form or page should be created to allow Facilities to save custom ids for each Agent.
The form should validate the custom id to ensure that it is unique for each Agent. If the custom id is already in use, an error message should be displayed.

## Ticket 5: Test and deploy

#### Acceptance Criteria: 
Changes should be thoroughly tested and deployed to production without any bugs or errors.

#### Time/Effort Estimate
2 hours

#### Implementation Details
To perform end-to-end testing of the changes, fix any bugs, and deploy the changes to production.