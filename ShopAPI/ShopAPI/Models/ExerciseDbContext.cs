using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace ShopAPI.Models
{
    public partial class ExerciseDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        private string dataSource;
        public ExerciseDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public ExerciseDbContext(DbContextOptions<ExerciseDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Part> Parts { get; set; }
        public virtual DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public virtual DbSet<PurchaseOrderLine> PurchaseOrderLines { get; set; }
        public virtual DbSet<StockSite> StockSites { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                dataSource = _configuration.GetConnectionString("ExAppConn");
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer(dataSource);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Part>(entity =>
            {
                entity.HasKey(e => e.PartNo);

                entity.ToTable("Part");

                entity.Property(e => e.PartName).HasMaxLength(200);
            });

            modelBuilder.Entity<PurchaseOrder>(entity =>
            {
                entity.HasKey(e => e.OrderNo)
                    .HasName("PK__Purchase__C3907C74D2AE2DA2");

                entity.ToTable("PurchaseOrder");

                entity.Property(e => e.Address).HasMaxLength(200);

                entity.Property(e => e.County).HasMaxLength(50);

                entity.Property(e => e.Note).HasMaxLength(200);

                entity.Property(e => e.PostCode).HasMaxLength(50);

                entity.Property(e => e.StockName).HasMaxLength(50);

                entity.Property(e => e.StockSite).HasMaxLength(50);

                entity.HasOne(d => d.StockSiteNavigation)
                    .WithMany(p => p.PurchaseOrders)
                    .HasForeignKey(d => d.StockSite)
                    .HasConstraintName("FK_StockSite_PO_StockSite");

                entity.HasOne(d => d.SupplierNoNavigation)
                    .WithMany(p => p.PurchaseOrders)
                    .HasForeignKey(d => d.SupplierNo)
                    .HasConstraintName("FK_Supplier_PO_SupplierNo");
            });

            modelBuilder.Entity<PurchaseOrderLine>(entity =>
            {
                entity.HasKey(e => new { e.PartNo, e.OrderNo })
                    .HasName("PK_POL");

                entity.ToTable("PurchaseOrderLine");

                entity.Property(e => e.BuyPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Manufacturer).HasMaxLength(100);

                entity.Property(e => e.Memo).HasMaxLength(100);

                entity.Property(e => e.PartDescription).HasMaxLength(100);

                entity.HasOne(d => d.PartNoNavigation)
                    .WithMany(p => p.PurchaseOrderLines)
                    .HasForeignKey(d => d.PartNo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_pol_part");
            });

            modelBuilder.Entity<StockSite>(entity =>
            {
                entity.HasKey(e => e.StockSite1);

                entity.ToTable("StockSite");

                entity.Property(e => e.StockSite1)
                    .HasMaxLength(50)
                    .HasColumnName("StockSite");

                entity.Property(e => e.Email).HasMaxLength(200);
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.HasKey(e => e.SupplierNo)
                    .HasName("PK__Supplier__4BE6998034C74E3B");

                entity.ToTable("Supplier");

                entity.Property(e => e.Email).HasMaxLength(200);

                entity.Property(e => e.SupplierName).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
