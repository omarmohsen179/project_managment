using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProjectManagement.Core
{
    interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");
        IQueryable<TEntity> GetAll();
        SkipAndTake SkipAndTake(int skip, string includeProperties = "");
        bool UpdateList(IEnumerable<TEntity> entity);
        TEntity GetById(params object[] id);
        TEntity Add(TEntity entity);
        bool Update(TEntity entity);
        bool Remove(TEntity entity);
        bool RemoveById(params object[] id);
   
}
}
