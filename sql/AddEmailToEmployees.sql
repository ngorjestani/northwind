ALTER TABLE dbo.Employees
ADD Email NVARCHAR(40) NOT NULL DEFAULT ''

GO

UPDATE dbo.Employees
SET Email = FirstName + '.' + LastName + '@northwind.com'


