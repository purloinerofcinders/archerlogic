USE [archerlogic]
GO
/****** Object:  StoredProcedure [dbo].[GetFamilyMembersOf]    Script Date: 11/2/2023 21:35:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[GetFamilyMembersOf] 
	-- Add the parameters for the stored procedure here
	@member int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	-- EXEC GetFamilyMembersOf 8
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @father_id int = (SELECT TOP 1 a.parent_id FROM member_to_member a LEFT JOIN member b ON a.parent_id = b.id WHERE member_id = @member AND b.sex = 'M') 
	DECLARE @father_name nvarchar(50) = (SELECT TOP 1 b.[name] FROM member_to_member a LEFT JOIN member b ON a.parent_id = b.id WHERE member_id = @member AND b.sex = 'M') 
	
	DECLARE @mother_id int = (SELECT TOP 1 a.parent_id FROM member_to_member a LEFT JOIN member b ON a.parent_id = b.id WHERE member_id = @member AND b.sex = 'F')
	DECLARE @mother_name nvarchar(50) = (SELECT TOP 1 b.[name] FROM member_to_member a LEFT JOIN member b ON a.parent_id = b.id WHERE member_id = @member AND b.sex = 'F')

	
    SELECT * INTO #TempTable FROM member_to_member WHERE parent_id = @father_id AND member_id != @member

	PRINT 'Father: ' + @father_name;
	PRINT 'Mother: ' + @mother_name;
	PRINT ' ';
	PRINT 'Siblings: ';

	WHILE EXISTS (SELECT * FROM #TempTable)
	BEGIN
		DECLARE @sibling_name nvarchar(50) = (SELECT TOP 1 b.[name] FROM #TempTable a LEFT JOIN member b ON a.member_id = b.id);
		PRINT @sibling_name

		SELECT TOP 1 * FROM #TempTable
		DELETE TOP(1) FROM #TempTable
	END

	PRINT ' ';

	DROP TABLE IF EXISTS #TempTable


END
