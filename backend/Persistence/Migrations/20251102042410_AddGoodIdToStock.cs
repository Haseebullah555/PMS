using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGoodIdToStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseDetails_Stocks_StockId",
                table: "PurchaseDetails");

            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "Stocks");

            migrationBuilder.AddColumn<int>(
                name: "GoodId",
                table: "Stocks",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "StockId",
                table: "PurchaseDetails",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_Stocks_GoodId",
                table: "Stocks",
                column: "GoodId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseDetails_Stocks_StockId",
                table: "PurchaseDetails",
                column: "StockId",
                principalTable: "Stocks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Stocks_Goods_GoodId",
                table: "Stocks",
                column: "GoodId",
                principalTable: "Goods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseDetails_Stocks_StockId",
                table: "PurchaseDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Stocks_Goods_GoodId",
                table: "Stocks");

            migrationBuilder.DropIndex(
                name: "IX_Stocks_GoodId",
                table: "Stocks");

            migrationBuilder.DropColumn(
                name: "GoodId",
                table: "Stocks");

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "Stocks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "StockId",
                table: "PurchaseDetails",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseDetails_Stocks_StockId",
                table: "PurchaseDetails",
                column: "StockId",
                principalTable: "Stocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
