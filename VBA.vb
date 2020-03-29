'注意事項
'VBAは基本メソッドの指定はSub~End Sub

Sub readInputFile()
    '画面の更新を止めて処理を高速化する→処理が高速化する
    Application.ScreenUpdating = False

    'Assign input folder path(Inputフォルダのパスを割り当てる)
    Dim fso As Object
    Set fso = CreateObject("Scripting.FileSystemObject")
    Dim inputFile As Object
    Dim inputFolderPath As String: inputFolderPath = "C:\UiPath\NY_TotalTreasury_UserRoleCreation\Input"

    'Read file in inputfolder again and again(Inputフォルダの中身をループする)
    For Each inputFile In fso.GetFolder(inputFolderPath).Files

        'Open input file(ファイルのオープン)
        Workbooks.Open inputFile

        'メソッド呼び出し
        'Argument:×, Return Value:companyName, unitCode
        Call getCompanyNameAndUnitCode(companyName, unitCode)

        '--------------Get input file name(Inputファイル名取得)-----------------------
        Dim arrInputFile() As String
        Dim arrCountInput As Integer
        Dim inputFileName As String
        arrInputFile = Split(inputFile, "\")
        'UBoundは配列の最大値を取得,LBoundは最も小さい要素番号を返す
        arrCountInput = UBound(arrInputFile)
        inputFileName = arrInputFile(arrCountInput)
        '----------------------------------------------------------------------------

        '-------------Create master file(Masterファイルの作成)-------------------------
        Dim fnd As String, rpl As String
        fnd = inputFileName
        templateFileNameInMaster = companyName + "_Master.xlsx"
        rpl = templateFileNameInMaster
        templateFileInMaster = Replace(inputFile, fnd, rpl)
        fnd = "Input"
        rpl = "Work\Master"
        templateFileInMaster = Replace(templateFileInMaster, fnd, rpl)
        'FileCopy a,bでaからbへファイルをコピーする
        FileCopy templateFile, templateFileInMaster
        '-----------------------------------------------------------------------------

        '--InputファイルのMGeB PlusシートをMasterファイルの最後尾にコピー--------------------------
        Dim wbActive As Workbook
        Dim wbOpen As Workbook

        Set wbOpen = Workbooks.Open(templateFileInMaster)

        Set wbActive = ActiveWorkbook

        Workbooks(inputFileName).Activate
        Worksheets("MGeB Plus").Activate
        Worksheets("MGeB Plus").Copy After:=wbActive.Sheets(wbActive.Worksheets.Count)

        Workbooks(templateFileNameInMaster).Save
        Workbooks(templateFileNameInMaster).Close
        '---------------------------------------------------------------------------------------------------------------

        Dim bool As Boolean: bool = True

        Dim allAccountList As Object
        Set allAccountList = CreateObject("System.Collections.ArrayList")
        Dim allAccountNumber As Long

        'Get all accout from master file(会社に対応する全口座を取得)
        'Argument:×, Return Value:allAccountList, allAccountNumber
        Call getAccountsAll(allAccountList, allAccountNumber)

        Dim x As Long: x = 10
        Dim y As Long: y = 158

        Dim next_Privileges_Patterns_Line As Long: next_Privileges_Patterns_Line = 34
        Dim next_Privileges_Patterns_Row As Long: next_Privileges_Patterns_Row = 19

        'Set row
        Dim column_J As Long: column_J = 10
        Dim rowPp As Long: rowPp = 174
        Dim rowPpAccessType As Long: rowPpAccessType = 175
        Dim rowRdc As Long: rowRdc = 177
        Dim rowRdcAccessType As Long: rowRdcAccessType = 178
        Dim rowImaging As Long: rowImaging = 180
        Dim rowTradeConfirmation As Long: rowTradeConfirmation = 182


        Dim rowIndex As Long: rowIndex = 4
        Dim rowIndexUserAndRdc As Long: rowIndexUserAndRdc = 2

        Dim loopIndex As Long: loopIndex = 1
        Dim userLoopIndex As Long: userLoopIndex = 1
        Dim rdcLoopIndex As Long: rdcLoopIndex = 1

        '--------------Get Master file name(Masterファイル名取得)-----------------------
        Dim arrTemplateFileInMaster() As String
        Dim arrCountMaster As Integer
        Dim masterFileName As String
        arrTemplateFileInMaster = Split(templateFileInMaster, "\")
        arrCountMaster = UBound(arrTemplateFileInMaster)
        masterFileName = arrTemplateFileInMaster(arrCountMaster)
        '-----------------------------------------------------------------------------

        'Open MasterFile
        Workbooks.Open templateFileInMaster

        Do While bool = True

            Workbooks(inputFileName).Activate
            With Sheets("MGeB Plus")

                Dim columnIndexInRole As Long: columnIndexInRole = 1

                Dim addOne As Long: addOne = 1

                '--------Create account list(登録するRoleに対応する口座を取得)-------
                Dim accountList As Object
                Set accountList = CreateObject("System.Collections.ArrayList")
                'Argument:x,y, Return Value:accountList
                Call getAccountList(x, y, accountList)
                '-------------------------------------------------------------

                'Read Privileges Patterns
                Dim positivePayStatus As String
                Dim positivePayAceessType As String
                Dim rdcStatus As String
                Dim rdcAccessType As String
                Dim imaging As String
                Dim tradeConfirmation As String

                'Read PositivePay
                'Argument:rowPp,column_J, Return Value:positivePayStatus
                Call getPositivePayStatus(rowPp, column_J, positivePayStatus)

                'Read PositivePay(AccessType)
                'Call getPositivePayStatus(rowPpAccessType, column_J, positivePayAceessType)
                'Argument:rowPpAccessType,column_J, Return Value:positivePayAceessType
                Call getPositivePayAceessType(rowPpAccessType, column_J, positivePayAceessType)

                'Read RDC
                'Argument:rowRdc,column_J, Return Value:rdcStatus
                Call getRdcStatus(rowRdc, column_J, rdcStatus)

                'Read RDC(AccessType)
                'Argument:rowRdcAccessType,column_J, Return Value:rdcAccessType
                Call getRdcAccessType(rowRdcAccessType, column_J, rdcAccessType)

                'Read Imaging
                'Argument:rowImaging,column_J, Return Value:imaging
                Call getImaging(rowImaging, column_J, imaging)

                'Read TradeConfirmation
                'Argument:rowTradeConfirmation,column_J, Return Value:tradeConfirmation
                Call getTradeConfirmation(rowTradeConfirmation, column_J, tradeConfirmation)

            End With


            Workbooks(masterFileName).Activate
            Dim inputItem
            Dim sequenceNumber As String
            sequenceNumber = unitCode + Format(Str(loopIndex), "00")

            '------Write on Role sheet---------------------------------------------------------------------------------------------------------------------------------------------------
            'Argument:"all variables", Return Value:×
            Sheets("Role").Activate
            Call writeRole(loopIndex, companyName, rowIndex, columnIndexInRole, inputItem, imaging, positivePayAceessType, rdcStatus, tradeConfirmation, rdcAccessType, sequenceNumber)
            '----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            '------Write on Admin sheet-------------------------------------
            'Argument:"all variables", Return Value:×
            Sheets("Admin").Activate
            Call writeAdmin(rowIndex, inputItem)
            '---------------------------------------------------------------

            '------Write on Imaging sheet-------------------------------------
            'Argument:"all variables", Return Value:×
            Sheets("Imaging").Activate
            Call writeImaging(rowIndex, inputItem, imaging, accountList)
            '---------------------------------------------------------------

            '------Write on MobileBanking sheet-------------------------------------------------
            'Argument:"all variables", Return Value:×
            Sheets("Mobile Banking").Activate
            Call writeMobileBanking(rowIndex, inputItem, positivePayAceessType, rdcAccessType)
            '------------------------------------------------------------------------------------

            '------Write on Portal sheet-------------------------------------------------
            'Argument:"all variables", Return Value:×
            Sheets("Portal").Activate
            Call writePortal(rowIndex, inputItem, rdcStatus, tradeConfirmation)
            '----------------------------------------------------------------------------

            '------Write on PositivePay sheet-----------------------------------------------
            'Argument:"all variables", Return Value:×
            Sheets("Positive Pay").Activate
            Call writePositivePay(rowIndex, inputItem, positivePayStatus, allAccountList)
            '-------------------------------------------------------------------------------


            'Operation on User/NetDeposit sheet
            Workbooks(inputFileName).Activate
            'Read Users
            Dim firstName As String
            Dim lastName As String
            Dim mgebUserId As String
            Dim subsidiaryDefault As String
            Dim email As String
            Dim mobileNumber As String

            Dim userList As Object
            Set userList = CreateObject("System.Collections.ArrayList")
            'Argument:loopIndex, Return Value:userList
            Call getUserList(loopIndex, userList)

            'Loop userList
            Dim userLine As Long: userLine = loopIndex
            Dim user
            For Each user In userList
                Dim arrStrUserAfterSplit() As String
                Dim i As Long
                Dim boolMatching As Boolean: boolMatching = True
                Dim roleDescription As String
                arrStrUserAfterSplit = Split(user, " ")
                Do While boolMatching
                    Workbooks(inputFileName).Activate
                    Call getUsers(userLine, firstName, lastName, mgebUserId, subsidiaryDefault, email, mobileNumber)

                    If firstName = arrStrUserAfterSplit(1) And lastName = arrStrUserAfterSplit(2) _
                        And Str(userLine) = Str(Left(arrStrUserAfterSplit(0), 1)) Then
                        'If roleDescription is empty, assign new roledescription
                        If Len(roleDescription) = 0 Then
                            roleDescription = firstName + lastName
                            roleDescription = Replace(roleDescription, "_", "")
                        Else
                        End If

                        Workbooks(masterFileName).Activate
                        '-------Write on User sheet-------------------------------------------------------------------------------------------------------------------------------------------------
                        Sheets("User").Activate
                        'Argument:"all variables", Return Value:×
                        Call writeUsers(userLoopIndex, companyName, firstName, lastName, unitCode, mgebUserId, sequenceNumber, roleDescription, email, mobileNumber, inputItem, rowIndexUserAndRdc)
                        '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                        '-------Write on Role sheet------------------------------------------------------------------------------------------------------------------------------------------------
                        Sheets("Role").Activate
                        'Argument:"all variables", Return Value:×
                        Call writeRoleOnlyRoleDescription(rowIndex, firstName, lastName)
                        '-------------------------------------------------------------------------------------------------------------------------

                        boolMatching = False
                    Else
                        userLine = userLine + 1
                    End If
                Loop

                If Not rdcStatus = "N/A" Then
                    '-------Write on NetDeposit sheet-------------------------------------------------------------------------------------------------------
                    Sheets("RDC").Activate
                    'Argument:"all variables", Return Value:×
                    Call writeRdc(rdcLoopIndex, companyName, firstName, lastName, inputItem, rowIndexUserAndRdc, accountList, allAccountNumber, rdcStatus)
                    '------------------------------------------------------------------------------------------------------------------------------

                    rdcLoopIndex = rdcLoopIndex + 1

                    rowIndexUserAndRdc = rowIndexUserAndRdc + 1
                Else

                End If

                userLoopIndex = userLoopIndex + 1

            Next

            'Initialize roleDescription
            roleDescription = ""

            If loopIndex Mod 2 = 0 Then

                y = y + next_Privileges_Patterns_Line
                x = x - next_Privileges_Patterns_Row

                column_J = column_J - next_Privileges_Patterns_Row
                rowPp = rowPp + next_Privileges_Patterns_Line
                rowPpAccessType = rowPpAccessType + next_Privileges_Patterns_Line
                rowRdc = rowRdc + next_Privileges_Patterns_Line
                rowRdcAccessType = rowRdcAccessType + next_Privileges_Patterns_Line
                rowImaging = rowImaging + next_Privileges_Patterns_Line
                rowTradeConfirmation = rowTradeConfirmation + next_Privileges_Patterns_Line

            Else

                x = x + next_Privileges_Patterns_Row

                column_J = column_J + next_Privileges_Patterns_Row
            End If

            loopIndex = loopIndex + 1
            rowIndex = rowIndex + 1

            'IsEmpty(Workbooks(inputFileName).Sheets("MGeB Plus").Cells(y, x).Value)
            If IsEmpty(Workbooks(inputFileName).Sheets("MGeB Plus").Cells(rowPp, x).Value) Then
                bool = False
            Else
            End If

        Loop

    Workbooks(inputFileName).Close
    Workbooks(masterFileName).Save
    Workbooks(masterFileName).Close

    Next


End Sub


Sub getCompanyNameAndUnitCode(companyName, unitCode)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        companyName = .Cells(5, 9).Value
        unitCode = .Cells(7, 31).Value
    End With
End Sub

Sub getAccountsAll(allAccountList, allAccountNumber)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        Dim x As Long: x = 7
        Dim y As Long: y = 77
        Do While Not IsEmpty(.Cells(y, x).Value)
            allAccountList.Add (.Cells(y, x).Value)
            y = y + 2
        Loop

        allAccountNumber = allAccountList.Count

    End With
End Sub

Sub getAccountList(x, y, accountList)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        Dim i
        Dim l
        Dim space As String: space = " "
        Dim account As String
        For i = x To x + 16
            For l = y To y + 4
                If Not IsEmpty(.Cells(l, i).Value) Then
                    account = .Cells(l, i).Value
                    accountList.Add (Right(account, Len(account) - InStr(account, space)))
                Else
                End If
            Next
            i = i + 5
        Next
    End With
End Sub


Sub getPositivePayStatus(rowPp, column_J, positivePayStatus)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        If Not IsEmpty(.Cells(rowPp, column_J).Value) Then
            positivePayStatus = .Cells(rowPp, column_J).Value
        Else
        End If
    End With
End Sub


Sub getPositivePayAceessType(rowPpAccessType, column_J, positivePayAceessType)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        If Not IsEmpty(.Cells(rowPpAccessType, column_J).Value) Then
            positivePayAceessType = .Cells(rowPpAccessType, column_J).Value
        Else
        End If
    End With
End Sub


Sub getRdcStatus(rowRdc, column_J, rdcStatus)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        If Not IsEmpty(.Cells(rowRdc, column_J).Value) Then
            rdcStatus = .Cells(rowRdc, column_J).Value
        Else
        End If
    End With
End Sub


Sub getRdcAccessType(rowRdcAccessType, column_J, rdcAccessType)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        If Not IsEmpty(.Cells(rowRdcAccessType, column_J).Value) Then
            rdcAccessType = .Cells(rowRdcAccessType, column_J).Value
        Else
        End If
    End With
End Sub


Sub getImaging(rowImaging, column_J, imaging)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        If Not IsEmpty(.Cells(rowImaging, column_J).Value) Then
            imaging = .Cells(rowImaging, column_J).Value
        Else
        End If
    End With
End Sub


Sub getTradeConfirmation(rowTradeConfirmation, column_J, tradeConfirmation)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        If Not IsEmpty(.Cells(rowTradeConfirmation, column_J).Value) Then
            tradeConfirmation = .Cells(rowTradeConfirmation, column_J).Value
        Else
        End If
    End With
End Sub

Sub getUsers(userLine, firstName, lastName, mgebUserId, subsidiaryDefault, email, mobileNumber)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        Dim mgeb_user_id_row As Long: mgeb_user_id_row = 7
        Dim first_name_row As Long: first_name_row = 13
        Dim last_name_row As Long: last_name_row = 19
        Dim email_row As Long: email_row = 27
        Dim mobile_number_row As Long: mobile_number_row = 36

        Dim usersLine As Long: usersLine = 119
        usersLine = usersLine + (userLine - 1) * 2

        mgebUserId = .Cells(usersLine, mgeb_user_id_row).Value
        firstName = .Cells(usersLine, first_name_row).Value
        lastName = .Cells(usersLine, last_name_row).Value
        email = .Cells(usersLine, email_row).Value
        mobileNumber = .Cells(usersLine, mobile_number_row).Value

    End With
End Sub

Sub getUserList(loopIndex, userList)
    Application.ScreenUpdating = False
    With Sheets("MGeB Plus")
        Dim userRow As Long: userRow = 11
        Dim userLine As Long: userLine = 261
        Dim i
        Dim l
        userLine = userLine + 3 * (loopIndex - 1)
        For i = userRow To userRow + 36
            For l = userLine To userLine + 2
                If Not IsEmpty(.Cells(l, i).Value) Then
                    userList.Add (.Cells(l, i).Value)
                Else
                End If
            Next
            i = i + 5
        Next
    End With
End Sub


Sub writeRole(loopIndex, companyName, rowIndex, columnIndexInRole, inputItem, imaging, positivePayAceessType, rdcStatus, tradeConfirmation, rdcAccessType, sequenceNumber)
    With Sheets("Role")
        Dim imagingStatus As String
        Dim mobileBankingStatus As String
        Dim portalStatus As String

        If imaging = "Yes" Then
            imagingStatus = "O"
        Else
            imagingStatus = ""
        End If

        If positivePayAceessType Like "*Desktop*Mobile*" Or rdcAccessType Like "*Desktop*Mobile*" Then
            mobileBankingStatus = "O"
        Else
            mobileBankingStatus = ""
        End If

        If (Not rdcStatus = "N/A") Or tradeConfirmation = "Yes" Then
            portalStatus = "O"
        Else
            portalStatus = ""
        End If

        Dim arrStrRole() As Variant
        arrStrRole = Array(Str(loopIndex), companyName, sequenceNumber, "", "All selected", "O", imagingStatus, mobileBankingStatus, portalStatus, "O")

        For Each inputItem In arrStrRole
            .Cells(rowIndex, columnIndexInRole) = inputItem
            columnIndexInRole = columnIndexInRole + 1
        Next

        Erase arrStrRole

    End With
End Sub


Sub writeRoleOnlyRoleDescription(rowIndex, firstName, lastName)
    With Sheets("Role")
        If IsEmpty(.Cells(rowIndex, 4)) Then
            .Cells(rowIndex, 4) = Replace(firstName + lastName, "_", "")
        Else
        End If
    End With
End Sub


Sub writeAdmin(rowIndex, inputItem)
    Dim columnIndex As Long: columnIndex = 6
    With Sheets("Admin")
        Dim arrStrAdmin() As Variant
        arrStrAdmin = Array("", "", "", "View/Edit/Approve", "", "View/Edit/Approve", "View", "", "View/Edit/Approve", _
            "", "", "", "View/Edit/Approve", "Edit/Execute", "", "O", "", "O", "O", "O", "O", "O", "O")

        For Each inputItem In arrStrAdmin
            .Cells(rowIndex, columnIndex) = inputItem
            columnIndex = columnIndex + 1
        Next

        Erase arrStrAdmin

    End With
End Sub

Sub writeImaging(rowIndex, inputItem, imaging, accountList)
    Dim columnIndex As Long: columnIndex = 6
    With Sheets("Imaging")
        Dim arrStrImaging() As Variant

        If imaging = "Yes" Then
            arrStrImaging = Array("View/Edit", "View")

            For Each inputItem In arrStrImaging
            .Cells(rowIndex, columnIndex) = inputItem
            columnIndex = columnIndex + 1
            Next

            For Each inputItem In accountList
            .Cells(rowIndex, columnIndex) = inputItem
            columnIndex = columnIndex + 1
            Next
        Else
            arrStrImaging = Array("", "")
        End If

        Erase arrStrImaging

    End With
End Sub


Sub writeMobileBanking(rowIndex, inputItem, positivePayAceessType, rdcAccessType)
    Dim columnIndex As Long: columnIndex = 6
    With Sheets("Mobile Banking")
        Dim arrStrMobileBanking() As Variant
        Dim rdc As String
        Dim positivePay As String
        If positivePayAceessType Like "*Desktop*Mobile*" Then
            rdc = "O"
        Else
            rdc = ""
        End If

        If rdcAccessType Like "*Desktop*Mobile*" Then
            positivePay = "O"
        Else
            positivePay = ""
        End If

        If rdc = "O" Or positivePay = "O" Then
            arrStrMobileBanking = Array(rdc, positivePay, "View", "View/Edit", "View/Edit")
        Else
            arrStrMobileBanking = Array("", "", "", "", "")
        End If

        For Each inputItem In arrStrMobileBanking
            .Cells(rowIndex, columnIndex) = inputItem
            columnIndex = columnIndex + 1
        Next

        Erase arrStrMobileBanking

        End With
End Sub


Sub writePortal(rowIndex, inputItem, rdcStatus, tradeConfirmation)
    Dim columnIndex As Long: columnIndex = 6
    With Sheets("Portal")
        Dim arrStrPortal() As Variant
        Dim portalRdc As String
        Dim portaltradeConfirmation As String

        If Not rdcStatus = "N/A" Then
            portalRdc = "View"
        Else
            portalRdc = ""
        End If

        If tradeConfirmation = "Yes" Then
            portaltradeConfirmation = "View"
        Else
            portaltradeConfirmation = ""
        End If

        If portalRdc = "View" Or portaltradeConfirmation = "View" Then
            'arrStrPortal = Array(portalRdc, portaltradeConfirmation)
            arrStrPortal = Array(portaltradeConfirmation, portalRdc)
        Else
            arrStrPortal = Array("", "")
        End If

        For Each inputItem In arrStrPortal
            .Cells(rowIndex, columnIndex) = inputItem
            columnIndex = columnIndex + 1
        Next

        Erase arrStrPortal

    End With
End Sub


Sub writePositivePay(rowIndex, inputItem, positivePayStatus, allAccountList)
    Dim columnIndex As Long: columnIndex = 6
    With Sheets("Positive Pay")
        Dim issuance As String
        Dim decision As String
        Dim viewPaidCheckImages As String
        Dim arrStrPositivePay() As Variant
        If positivePayStatus = "N/A" Then
            issuance = ""
            decision = ""
            viewPaidCheckImages = ""
        ElseIf positivePayStatus = "View (Desktop Only)" Then
            issuance = "View"
            decision = "View"
            viewPaidCheckImages = "View"
        ElseIf positivePayStatus = "View, Create (Desktop Only)" Then
            issuance = "View/Edit"
            decision = "View/Edit"
            viewPaidCheckImages = "View"
        ElseIf positivePayStatus = "View, Approve (Select Access Type)" Then
            issuance = "View/Approve"
            decision = "View/Approve"
            viewPaidCheckImages = "View"
        Else
            issuance = "View/Edit/Approve"
            decision = "View/Edit/Approve"
            viewPaidCheckImages = "View"
        End If

        arrStrPositivePay = Array(issuance, decision, viewPaidCheckImages, "O", "O", "O", "O", "O", "O")

        For Each inputItem In arrStrPositivePay
            .Cells(rowIndex, columnIndex) = inputItem
            columnIndex = columnIndex + 1
        Next

        For Each inputItem In allAccountList
            .Cells(rowIndex, columnIndex) = inputItem
            columnIndex = columnIndex + 1
        Next

        Erase arrStrPositivePay

    End With
End Sub

Sub writeUsers(loopIndex, companyName, firstName, lastName, unitCode, mgebUserId, sequenceNumber, roleDescription, email, mobileNumber, inputItem, rowIndexUserAndRdc)
    Dim columnIndex As Long: columnIndex = 1

    With Sheets("User")
        Dim arrStrUsers() As Variant

        arrStrUsers = Array(loopIndex, companyName, firstName, lastName, unitCode, mgebUserId, unitCode + mgebUserId, Date, sequenceNumber, roleDescription, email, mobileNumber, "")

        For Each inputItem In arrStrUsers
            .Cells(rowIndexUserAndRdc, columnIndex) = inputItem
            columnIndex = columnIndex + 1
        Next

        Erase arrStrUsers

    End With
End Sub

Sub writeRdc(loopIndex, companyName, firstName, lastName, inputItem, rowIndexUserAndRdc, accountList, allAccountNumber, rdcStatus)
    Dim columnIndex As Long: columnIndex = 1
    With Sheets("RDC")

        Dim replacedRDCStatus As String
        Dim scanMessage As String: scanMessage = "Scan"
        Dim reportMessage As String: reportMessage = "Report"
        Dim selectMessage As String: selectMessage = " (Select Access Type)"
        Dim desktopMessage As String: desktopMessage = " (Desktop "

        If InStr(rdcStatus, scanMessage) > 0 And InStr(rdcStatus, reportMessage) > 0 Then
            replacedRDCStatus = Replace(rdcStatus, ", ", "")
            replacedRDCStatus = Replace(replacedRDCStatus, selectMessage, "")

        ElseIf InStr(rdcStatus, scanMessage) > 0 Then
            replacedRDCStatus = Replace(rdcStatus, selectMessage, "")
            replacedRDCStatus = replacedRDCStatus + "Only"

        ElseIf InStr(rdcStatus, reportMessage) > 0 Then
            replacedRDCStatus = Replace(rdcStatus, desktopMessage, "")
            replacedRDCStatus = Replace(replacedRDCStatus, ")", "")

        End If


        Dim arrStrRdc() As Variant
        arrStrRdc = Array(loopIndex, companyName, "", firstName, lastName, "Welcome1", replacedRDCStatus)

        For Each inputItem In arrStrRdc
            If IsEmpty(inputItem) Then
            Else
            .Cells(rowIndexUserAndRdc, columnIndex) = inputItem
            End If
            columnIndex = columnIndex + 1
        Next

        If replacedRDCStatus = "ReportOnly" Then

        Else
            If allAccountNumber = accountList.Count Then
                .Cells(rowIndexUserAndRdc, columnIndex) = "---All Accounts---"
            Else
                For Each inputItem In accountList
                .Cells(rowIndexUserAndRdc, columnIndex) = inputItem
                columnIndex = columnIndex + 1
                Next
            End If
        end If

        Erase arrStrRdc

    End With
End Sub