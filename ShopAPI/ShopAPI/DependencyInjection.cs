using Microsoft.Extensions.DependencyInjection;
using ShopAPI.DTO;
using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Managers;
using ShopAPI.Repositories;
using ShopAPI.Services;
namespace ShopAPI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            //manager
            services.AddTransient<PurchaseOrderManager, PurchaseOrderManager>();
            services.AddTransient<PurchaseOrderLineManager, PurchaseOrderLineManager>();
            //send mail
            services.AddScoped<ISendMailService, SendMailService>();
            //po
            services.AddScoped<IPurchaseOrderService, PurchaseOrderService>();
            services.AddScoped<IPurchaseOrderRepository, PurchaseOrderRepository>();
            //pol
            services.AddScoped<IPurchaseOrderLineService, PurchaseOrderLineService>();
            services.AddScoped<IPurchaseOrderLineRepository, PurchaseOrderLineRepository>();
            services.AddScoped<IPoAndPolService, PoAndPolService>();
            //part
            services.AddScoped<IPartService, PartService>();
            services.AddScoped<IPartRepository, PartRepository>();
            //supplier
            services.AddScoped<ISupplierService, SupplierService>();
            services.AddScoped<ISupplierRepository, SupplierRepository>();
            //stocksite
            services.AddScoped<IStockSiteService, StockSiteService>();
            services.AddScoped<IStockSiteRepository, StockSiteRepository>();
            //logger
            services.AddScoped<IUserAccountRepository, UserAccountRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<ILoggerService, LoggerService>();
            
            return services;
        }
    }
}
