"""add company user ownership

Revision ID: 3974dc3559d8
Revises: f326ee2b520b
Create Date: 2026-08-12 09:00:03.306259

"""
"""add company user ownership

Revision ID: add_company_user_ownership
Revises: YOUR_PREVIOUS_REVISION
"""

from alembic import op
import sqlalchemy as sa


# Replace this with the actual revision ID shown
# in the generated migration file.
revision = "3974dc3559d8"
down_revision = "f326ee2b520b"
branch_labels = None
depends_on = None


def upgrade():
    # 1. Temporarily allow NULL so existing companies can be migrated.
    op.add_column(
        "companies",
        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    # 2. Assign existing companies to the current admin account.
    #
    # IMPORTANT:
    # Replace the email below with the email of the
    # CareerWise admin account you want to own the
    # existing companies.
    op.execute(
        """
        UPDATE companies
        SET user_id = (
            SELECT id
            FROM users
            WHERE email = 'admin@careerwiseai.com'
        )
        WHERE user_id IS NULL
        """
    )

    # 3. Make ownership mandatory for all future records.
    op.alter_column(
        "companies",
        "user_id",
        existing_type=sa.Integer(),
        nullable=False,
    )

    # 4. Add the foreign key.
    op.create_foreign_key(
        "fk_companies_user_id_users",
        "companies",
        "users",
        ["user_id"],
        ["id"],
    )

    # 5. Index for efficient per-user queries.
    op.create_index(
        "ix_companies_user_id",
        "companies",
        ["user_id"],
    )


def downgrade():
    op.drop_index(
        "ix_companies_user_id",
        table_name="companies",
    )

    op.drop_constraint(
        "fk_companies_user_id_users",
        "companies",
        type_="foreignkey",
    )

    op.drop_column(
        "companies",
        "user_id",
    )