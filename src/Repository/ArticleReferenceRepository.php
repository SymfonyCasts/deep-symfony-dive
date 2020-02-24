<?php

namespace App\Repository;

use App\Entity\ArticleReference;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ArticleReference|null find($id, $lockMode = null, $lockVersion = null)
 * @method ArticleReference|null findOneBy(array $criteria, array $orderBy = null)
 * @method ArticleReference[]    findAll()
 * @method ArticleReference[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleReferenceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ArticleReference::class);
    }

    // /**
    //  * @return ArticleReference[] Returns an array of ArticleReference objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ArticleReference
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
